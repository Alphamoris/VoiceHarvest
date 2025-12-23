"use client";

import { motion } from "framer-motion";
import { useVoice } from "@/context/VoiceContext";
import { cn } from "@/lib/utils";

export function TranscriptionDisplay() {
  const { voiceState, transcription, confidence } = useVoice();

  if (voiceState !== "recording" && !transcription) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-gray-50 border-2 border-forest rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            What we heard:
          </span>
          {confidence > 0 && (
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                confidence >= 0.85
                  ? "bg-green-100 text-green-700"
                  : confidence >= 0.7
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {Math.round(confidence * 100)}% confidence
            </span>
          )}
        </div>
        <p className="text-gray-800 min-h-[24px]">
          {transcription || (
            <span className="text-gray-400 italic">Listening...</span>
          )}
          {voiceState === "recording" && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-5 bg-forest ml-0.5 align-middle"
            />
          )}
        </p>
      </div>
    </motion.div>
  );
}
