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

      const response = await fetch("/api/voice/process", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to process voice command");
      }

      const responseData = data.data || data;
      
      setTranscription(responseData.transcription || "");
      setConfidence(responseData.confidence || 0);

      const result: VoiceResult = {
        success: true,
        message: responseData.response || "Command processed",
        data: {
          extractedData: responseData.extractedData,
          canCreateOrder: responseData.canCreateOrder,
          canCreateListing: responseData.canCreateListing,
          action: responseData.action,
        },
        error: undefined,
        suggestions: responseData.suggestions || [],
      };

      setLastResult(result);

      const command: VoiceCommand = {
        id: Math.random().toString(36).substring(2, 9),
        userId: "",
        transcription: responseData.transcription || "",
        action: responseData.action || "UNKNOWN",
        result,
        confidence: responseData.confidence || 0,
        timestamp: new Date(),
      };

      setCommandHistory((prev) => [command, ...prev.slice(0, 9)]);
      setVoiceState("success");
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
