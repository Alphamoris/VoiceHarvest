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
          {/* Logo skeleton */}
          <div className="text-center mb-8">
            <div className="h-10 w-40 bg-gray-200 rounded shimmer mx-auto mb-4" />
            <div className="h-8 w-48 bg-gray-200 rounded shimmer mx-auto mb-2" />
            <div className="h-5 w-56 bg-gray-200 rounded shimmer mx-auto" />
          </div>

          {/* Form skeleton */}
          <div className="space-y-6">
            {/* Input fields */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 rounded shimmer mb-2" />
                <div className="h-12 w-full bg-gray-200 rounded-lg shimmer" />
              </div>
            ))}

            {/* Button skeleton */}
            <div className="h-12 w-full bg-gray-200 rounded-lg shimmer" />

            {/* Link skeleton */}
            <div className="h-5 w-64 bg-gray-200 rounded shimmer mx-auto" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
