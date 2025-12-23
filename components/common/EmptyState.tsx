"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      {icon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-4 text-6xl"
        >
          {icon}
        </motion.div>
      )}
      <h3
        className="text-xl font-semibold text-gray-800 mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      )}
      {action && <div>{action}</div>}
    </motion.div>
  );
}

export function NoListings() {
  return (
    <EmptyState
      icon="📦"
      title="No Listings Yet"
      description="Start earning by creating your first listing. It only takes a minute!"
    />
  );
}

export function NoOrders() {
  return (
    <EmptyState
      icon="🛒"
      title="No Orders Yet"
      description="When buyers purchase your crops, they'll appear here."
    />
  );
}

export function NoHistory() {
  return (
    <EmptyState
      icon="🎤"
      title="No Voice Commands Yet"
      description="Start using voice commands to create listings and manage your inventory."
    />
  );
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon="🔍"
      title="No Results Found"
      description="Try adjusting your search or filters to find what you're looking for."
    />
  );
}
