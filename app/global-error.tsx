"use client";

import { PageError } from "@/components/common/ErrorBoundary";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <PageError
          title="Something went wrong"
          message={
            process.env.NODE_ENV === "development"
              ? error.message
              : "We encountered an unexpected error. Please try again."
          }
          showRetry
          showHome
          onRetry={reset}
        />
      </body>
    </html>
  );
}
