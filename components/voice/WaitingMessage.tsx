"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function WaitingMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <motion.div
        className="bg-cream border-2 border-gold rounded-xl p-6"
        animate={{
          backgroundColor: ["#FFFBF0", "rgba(255, 179, 0, 0.1)", "#FFFBF0"],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="flex-shrink-0"
          >
            <Loader2 className="h-8 w-8 text-gold" />
          </motion.div>

          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-semibold text-forest text-lg mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Processing Your Voice Command
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-sm mb-4"
            >
              We&apos;re analyzing your voice and creating your order...
            </motion.p>

            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-lime rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "90%" }}
                transition={{ duration: 8, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-xs mt-2"
            >
              This usually takes 5-10 seconds
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
