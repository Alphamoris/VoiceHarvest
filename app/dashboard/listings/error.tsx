"use client";

import { PageError } from "@/components/common/ErrorBoundary";

export default function ListingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageError
      title="Listings Error"
      message={
        process.env.NODE_ENV === "development"
          ? error.message
          : "We couldn't load your listings. Please try again."
      }
      showRetry
      showHome
      onRetry={reset}
    />
  );
}
