"use client";

import { PageError } from "@/components/common/ErrorBoundary";

export default function OrdersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageError
      title="Orders Error"
      message={
        process.env.NODE_ENV === "development"
          ? error.message
          : "We couldn't load your orders. Please try again."
      }
      showRetry
      showHome
      onRetry={reset}
    />
  );
}
