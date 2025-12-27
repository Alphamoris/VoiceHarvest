"use client";

import { motion } from "framer-motion";
import { VoiceChat } from "@/components/voice";
import { Mic, HelpCircle, Volume2, Languages, Globe, Heart } from "lucide-react";

const tips = [
  {
    icon: Mic,
    title: "Speak Clearly",
    description: "Talk in your natural voice at a normal pace for best recognition accuracy.",
  },
  {
    icon: Volume2,
    title: "Quiet Environment",
    description: "Find a quiet place for best results. Background noise can affect recognition accuracy.",
  },
  {
    icon: Languages,
    title: "Supported Languages",
    description: "Currently supporting English, हिंदी (Hindi), and தமிழ் (Tamil).",
  },
  {
    icon: HelpCircle,
    title: "Example Commands",
    description: 'Try saying "Sell 100 kg tomatoes at 40 rupees" or "Show my orders"',
  },
];

const supportedLanguages = [
  { name: "English", native: "English", flag: "🇬🇧" },
  { name: "Hindi", native: "हिंदी", flag: "🇮🇳" },
  { name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
];

export default function VoicePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-forest to-forest/80 text-white mb-4">
          <Mic className="w-8 h-8" />
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
          Voice Assistant
        </h1>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">
          Create listings, check orders, and manage your farm using just your voice.
          No typing required!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-forest/5 via-lime/10 to-gold/5 rounded-2xl p-6 border border-lime/20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Globe className="w-6 h-6 text-forest" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Currently Supported Languages</h3>
              <p className="text-sm text-gray-600">We&apos;re actively working to add more languages</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {supportedLanguages.map((lang) => (
              <motion.div
                key={lang.name}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 text-center"
              >
                <span className="text-lg mb-1 block">{lang.flag}</span>
                <span className="text-xs font-medium text-gray-700">{lang.native}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-4 border-t border-lime/20 flex items-center gap-2 justify-center text-sm text-gray-600"
        >
          <Heart className="w-4 h-4 text-red-400" />
          <span>Your support helps us add more languages like Telugu, Kannada, Bengali & more!</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {tips.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center mb-3">
              <tip.icon className="w-5 h-5 text-forest" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
            <p className="text-sm text-gray-600">{tip.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <VoiceChat />
      </motion.div>
    </div>
  );
}
