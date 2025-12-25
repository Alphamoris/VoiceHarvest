"use client";

import { PageError } from "@/components/common/ErrorBoundary";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageError
      title="Dashboard Error"
      message={
        process.env.NODE_ENV === "development"
          ? error.message
          : "We couldn't load your dashboard. Please try again."
      }
      showRetry
      showHome
      onRetry={reset}
    />
  );
}
