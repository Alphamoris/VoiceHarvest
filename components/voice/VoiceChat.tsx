"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, ChevronDown, ChevronUp } from "lucide-react";
import { VoiceInput } from "./VoiceInput";
import { WaitingMessage } from "./WaitingMessage";
import { TranscriptionDisplay } from "./TranscriptionDisplay";
import { ResponseDisplay } from "./ResponseDisplay";
import { CommandHistory } from "./CommandHistory";
import { useVoice } from "@/context/VoiceContext";

const exampleCommands = [
  {
    title: "🛒 Place an Order",
    command: "I want to buy 50 kg tomatoes",
    result: "Creates an order request",
    highlight: true,
  },
  {
    title: "🌾 Sell Your Produce",
    command: "I have 100 kg wheat at 45 rupees per kg",
    result: "Creates a listing automatically",
    highlight: true,
  },
  {
    title: "💰 Check Market Prices",
    command: "What is the price of rice today?",
    result: "Shows current market rates",
    highlight: false,
  },
  {
    title: "📋 Track Orders",
    command: "Show my orders",
    result: "Displays your order history",
    highlight: false,
  },
];

export function VoiceChat() {
  const { voiceState } = useVoice();
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lime/20 mb-4"
        >
          <Mic className="h-8 w-8 text-forest" />
        </motion.div>
        <h1
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Voice Assistant
        </h1>
        <p className="text-gray-600 mb-3">
          Order produce, sell crops, or check prices - all with your voice!
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime/20 rounded-full text-sm text-forest">
          <span>🌾</span>
          <span>Supports English, Hindi & Tamil</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <VoiceInput />
      </motion.div>

      <AnimatePresence mode="wait">
        {voiceState === "recording" && (
          <motion.div
            key="transcription"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <TranscriptionDisplay />
          </motion.div>
        )}

        {voiceState === "processing" && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <WaitingMessage />
          </motion.div>
        )}

        {(voiceState === "success" || voiceState === "error") && (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ResponseDisplay />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-soft overflow-hidden"
      >
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-800">
            How to Use Voice Commands
          </span>
          {showExamples ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>

        <AnimatePresence>
          {showExamples && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exampleCommands.map((example, index) => (
                    <motion.div
                      key={example.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`rounded-lg p-3 ${example.highlight ? 'bg-lime/20 border border-lime/40' : 'bg-gray-50'}`}
                    >
                      <h4 className="font-medium text-sm text-gray-800 mb-1">
                        {example.title}
                      </h4>
                      <p className="text-sm text-sky italic mb-1">
                        &ldquo;{example.command}&rdquo;
                      </p>
                      <p className="text-xs text-gray-500">{example.result}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-3 border-t">
                  <h4 className="font-medium text-sm text-gray-800 mb-2">
                    Supported Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "English",
                      "Hindi",
                      "Tamil",
                      "Telugu",
                      "Kannada",
                      "Marathi",
                      "Gujarati",
                      "Punjabi",
                      "Bengali",
                    ].map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-1 bg-forest/10 text-forest text-xs rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <CommandHistory />
      </motion.div>
    </div>
  );
}
