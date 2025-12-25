"use client";

import { motion } from "framer-motion";
import { ListSkeleton, Skeleton } from "@/components/common/Loading";

export default function OrdersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 w-40 bg-gray-200 rounded shimmer mb-2" />
          <div className="h-5 w-56 bg-gray-200 rounded shimmer" />
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg shimmer" />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ListSkeleton items={6} />
      </motion.div>
    </div>
  );
}
