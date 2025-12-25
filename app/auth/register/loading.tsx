"use client";

import { motion } from "framer-motion";

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-lime/10 px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-medium p-8">
          <div className="text-center mb-8">
            <div className="h-10 w-40 bg-gray-200 rounded shimmer mx-auto mb-4" />
            <div className="h-8 w-48 bg-gray-200 rounded shimmer mx-auto mb-2" />
            <div className="h-5 w-56 bg-gray-200 rounded shimmer mx-auto" />
          </div>

          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full shimmer" />
                {s < 3 && <div className="w-12 h-0.5 bg-gray-200" />}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 rounded shimmer mb-2" />
                <div className="h-12 w-full bg-gray-200 rounded-lg shimmer" />
              </div>
            ))}

            <div className="h-12 w-full bg-gray-200 rounded-lg shimmer mt-6" />

            <div className="h-5 w-64 bg-gray-200 rounded shimmer mx-auto" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
