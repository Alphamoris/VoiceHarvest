"use client";

import { motion } from "framer-motion";
import { CardSkeleton } from "@/components/common/Loading";

export default function ListingsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded shimmer mb-2" />
          <div className="h-5 w-64 bg-gray-200 rounded shimmer" />
        </div>
        <div className="h-11 w-36 bg-gray-200 rounded-lg shimmer" />
      </div>

      <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="h-10 w-48 bg-gray-200 rounded-lg shimmer" />
          <div className="h-10 w-36 bg-gray-200 rounded-lg shimmer" />
          <div className="h-10 w-36 bg-gray-200 rounded-lg shimmer" />
          <div className="h-10 w-24 bg-gray-200 rounded-lg shimmer" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </motion.div>
    </div>
  );
}
