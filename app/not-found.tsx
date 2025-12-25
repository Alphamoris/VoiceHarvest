import { NotFoundError } from "@/components/common/ErrorBoundary";

export default function NotFound() {
  return (
    <NotFoundError
      title="Page not found"
      message="The page you're looking for doesn't exist or has been moved."
      backLink="/"
      backLabel="Go Home"
    />
  );
}
