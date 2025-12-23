"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "skeleton";
  className?: string;
  text?: string;
}

export function Loading({
  size = "md",
  variant = "spinner",
  className,
  text,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  if (variant === "spinner") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-gray-200 border-t-forest",
            sizeClasses[size]
          )}
        />
        {text && <p className="text-sm text-gray-600">{text}</p>}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-forest animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        {text && <p className="ml-3 text-sm text-gray-600">{text}</p>}
      </div>
    );
  }

  return null;
}

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseStyles = "shimmer rounded";

  if (variant === "circular") {
    return (
      <div
        className={cn(baseStyles, "rounded-full", className)}
        style={{ width: width || 40, height: height || 40 }}
      />
    );
  }

  if (variant === "rectangular") {
    return (
      <div
        className={cn(baseStyles, "rounded-lg", className)}
        style={{ width: width || "100%", height: height || 100 }}
      />
    );
  }

  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseStyles, className)}
            style={{
              width: i === lines - 1 ? "60%" : "100%",
              height: height || 16,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseStyles, className)}
      style={{ width: width || "100%", height: height || 16 }}
    />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-forest/20" />
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-forest animate-spin" />
        </div>
        <p className="text-lg text-forest font-medium">Loading...</p>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6 space-y-4">
      <Skeleton variant="rectangular" height={160} className="rounded-lg" />
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" lines={2} />
      <div className="flex gap-3">
        <Skeleton variant="rectangular" width={100} height={36} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </div>
    </div>
  );
}

export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="70%" height={16} />
          </div>
          <Skeleton variant="rectangular" width={80} height={32} />
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-soft p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton variant="text" width={60} height={16} />
          </div>
          <Skeleton variant="text" width="50%" height={32} />
          <Skeleton variant="text" width="70%" height={16} />
        </div>
      ))}
    </div>
  );
}
