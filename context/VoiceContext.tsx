"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import type {
  VoiceState,
  VoiceCommand,
  VoiceResult,
  VoiceAction,
  ExtractedEntities,
} from "@/types";

interface VoiceContextType {
  voiceState: VoiceState;
  transcription: string;
  confidence: number;
  error: string | null;
  isRecording: boolean;
  commandHistory: VoiceCommand[];
  lastResult: VoiceResult | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  processVoiceCommand: (audioBlob: Blob) => Promise<void>;
  clearError: () => void;
  resetState: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [transcription, setTranscription] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([]);
  const [lastResult, setLastResult] = useState<VoiceResult | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setVoiceState("recording");
      setTranscription("");
      setConfidence(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        stream.getTracks().forEach((track) => track.stop());
        await processVoiceCommand(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100);
      setIsRecording(true);
    } catch (err) {
      setError("Microphone permission denied or not available");
      setVoiceState("error");
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const processVoiceCommand = useCallback(async (audioBlob: Blob) => {
    setVoiceState("processing");

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append("language", "en-IN");

      const response = await fetch("/api/voice/process-command", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process voice command");
      }

      const data = await response.json();

      setTranscription(data.transcription || "");
      setConfidence(data.confidence || 0);

      const result: VoiceResult = {
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
        suggestions: data.suggestions,
      };

      setLastResult(result);

      const command: VoiceCommand = {
        id: Math.random().toString(36).substring(2, 9),
        userId: "",
        transcription: data.transcription || "",
        action: data.action || "UNKNOWN",
        result,
        confidence: data.confidence || 0,
        timestamp: new Date(),
      };

      setCommandHistory((prev) => [command, ...prev.slice(0, 9)]);
      setVoiceState(result.success ? "success" : "error");

      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to process voice command. Please try again.");
      setVoiceState("error");
      setLastResult({
        success: false,
        message: "Processing failed",
        error: "Failed to process voice command",
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetState = useCallback(() => {
    setVoiceState("idle");
    setTranscription("");
    setConfidence(0);
    setError(null);
    setLastResult(null);
  }, []);

  return (
    <VoiceContext.Provider
      value={{
        voiceState,
        transcription,
        confidence,
        error,
        isRecording,
        commandHistory,
        lastResult,
        startRecording,
        stopRecording,
        processVoiceCommand,
        clearError,
        resetState,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
}
