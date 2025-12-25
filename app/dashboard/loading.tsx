"use client";

import { motion } from "framer-motion";
import { Skeleton, StatsSkeleton, CardSkeleton } from "@/components/common/Loading";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton variant="text" width={200} height={32} className="mb-2" />
          <Skeleton variant="text" width={300} height={20} />
        </div>
        <Skeleton variant="rectangular" width={140} height={44} className="rounded-lg" />
      </div>

      <StatsSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <Skeleton variant="text" width={150} height={24} className="mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1">
                  <Skeleton variant="text" width="70%" height={18} className="mb-1" />
                  <Skeleton variant="text" width="50%" height={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <Skeleton variant="text" width={150} height={24} className="mb-4" />
          <Skeleton variant="rectangular" height={200} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}
