"use client";

import { PageError } from "@/components/common/ErrorBoundary";

export default function VoiceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageError
      title="Voice Interface Error"
      message={
        process.env.NODE_ENV === "development"
          ? error.message
          : "We couldn't load the voice interface. Please try again."
      }
      showRetry
      showHome
      onRetry={reset}
    />
  );
}
