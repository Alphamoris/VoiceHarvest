"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, Check, X } from "lucide-react";
import { useVoice } from "@/context/VoiceContext";
import { cn } from "@/lib/utils";

export function VoiceInput() {
  const {
    voiceState,
    isRecording,
    startRecording,
    stopRecording,
    resetState,
  } = useVoice();

  const handleClick = async () => {
    if (voiceState === "error" || voiceState === "success") {
      resetState();
      return;
    }

    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const buttonColors = {
    idle: "bg-forest",
    recording: "bg-lime",
    processing: "bg-gray-400",
    success: "bg-success",
    error: "bg-error",
  };

  const iconColors = {
    idle: "text-white",
    recording: "text-forest",
    processing: "text-white",
    success: "text-white",
    error: "text-white",
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <AnimatePresence>
          {voiceState === "recording" && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-lime"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          disabled={voiceState === "processing"}
          className={cn(
            "relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-colors",
            buttonColors[voiceState],
            voiceState === "processing" && "cursor-not-allowed opacity-60"
          )}
          whileHover={
            voiceState !== "processing" ? { scale: 1.05 } : undefined
          }
          whileTap={voiceState !== "processing" ? { scale: 0.95 } : undefined}
          animate={
            voiceState === "idle"
              ? { scale: [1, 1.03, 1] }
              : voiceState === "success"
              ? { scale: [0.8, 1.1, 1] }
              : voiceState === "error"
              ? { x: [-4, 4, -4, 4, 0] }
              : {}
          }
          transition={
            voiceState === "idle"
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : voiceState === "success"
              ? { duration: 0.4 }
              : voiceState === "error"
              ? { duration: 0.4 }
              : {}
          }
          aria-label={
            voiceState === "idle"
              ? "Start recording"
              : voiceState === "recording"
              ? "Stop recording"
              : voiceState === "processing"
              ? "Processing voice"
              : voiceState === "success"
              ? "Recording successful"
              : "Recording failed"
          }
        >
          {voiceState === "idle" && (
            <Mic className={cn("h-12 w-12", iconColors.idle)} />
          )}
          {voiceState === "recording" && (
            <Square className={cn("h-10 w-10", iconColors.recording)} />
          )}
          {voiceState === "processing" && (
            <Loader2
              className={cn("h-12 w-12 animate-spin", iconColors.processing)}
            />
          )}
          {voiceState === "success" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check className={cn("h-12 w-12", iconColors.success)} />
            </motion.div>
          )}
          {voiceState === "error" && (
            <X className={cn("h-12 w-12", iconColors.error)} />
          )}
        </motion.button>
      </div>

      <motion.p
        key={voiceState}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-gray-600 text-center"
      >
        {voiceState === "idle" && "Tap to speak"}
        {voiceState === "recording" && "Listening... Tap to stop"}
        {voiceState === "processing" && "Processing your voice..."}
        {voiceState === "success" && "Success! Tap to speak again"}
        {voiceState === "error" && "Something went wrong. Tap to try again"}
      </motion.p>
    </div>
  );
}
