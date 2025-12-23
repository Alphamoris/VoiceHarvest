"use client";

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare let SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

export type VoiceState = "idle" | "listening" | "processing" | "success" | "error";

interface VoiceResult {
  transcription: string;
  confidence: number;
  language: string;
  extractedData?: Record<string, unknown>;
  response?: string;
  suggestions?: string[];
}

interface VoiceContextType {
  state: VoiceState;
  transcription: string;
  result: VoiceResult | null;
  error: string | null;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  reset: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

interface VoiceProviderProps {
  children: ReactNode;
}

export function VoiceProvider({ children }: VoiceProviderProps) {
  const [state, setState] = useState<VoiceState>("idle");
  const [transcription, setTranscription] = useState("");
  const [result, setResult] = useState<VoiceResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const isSupported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const processVoice = useCallback(async (text: string) => {
    try {
      setState("processing");
      const response = await fetch("/api/voice/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcription: text, language: "hi-IN" }),
      });

      if (!response.ok) throw new Error("Failed to process voice");

      const data = await response.json();
      setResult({
        transcription: text,
        confidence: data.data.confidence || 0.85,
        language: data.data.language || "hi-IN",
        extractedData: data.data.extractedData,
        response: data.data.response,
        suggestions: data.data.suggestions,
      });
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
      setState("error");
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "hi-IN";

    recognition.onstart = () => {
      setState("listening");
      setError(null);
      setTranscription("");
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscription(transcript);
    };

    recognition.onerror = (event) => {
      setError(event.error);
      setState("error");
    };

    recognition.onend = () => {
      if (transcription) {
        processVoice(transcription);
      } else {
        setState("idle");
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isSupported, transcription, processVoice]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setTranscription("");
    setResult(null);
    setError(null);
  }, []);

  return (
    <VoiceContext.Provider
      value={{
        state,
        transcription,
        result,
        error,
        isSupported,
        startListening,
        stopListening,
        reset,
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
