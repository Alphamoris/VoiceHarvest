"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/common/Loading";

export default function VoiceLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="h-10 w-64 bg-gray-200 rounded shimmer mx-auto mb-3" />
        <div className="h-6 w-96 bg-gray-200 rounded shimmer mx-auto" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-soft p-8 text-center"
      >
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto shimmer mb-6" />
        <div className="h-6 w-48 bg-gray-200 rounded shimmer mx-auto mb-4" />
        <div className="h-4 w-64 bg-gray-200 rounded shimmer mx-auto" />
      </motion.div>

      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="h-6 w-40 bg-gray-200 rounded shimmer mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full shimmer" />
              <div className="flex-1">
                <div className="h-5 w-3/4 bg-gray-200 rounded shimmer mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
