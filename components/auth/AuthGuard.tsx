"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { PageLoader } from "@/components/common/Loading";
import { ROUTES } from "@/lib/constants";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export function AuthGuard({
  children,
  requireAuth = true,
  allowedRoles,
  redirectTo,
}: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo || ROUTES.auth.login);
      return;
    }

    if (!requireAuth && isAuthenticated) {
      router.push(redirectTo || ROUTES.dashboard.home);
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.push(ROUTES.dashboard.home);
      return;
    }
  }, [loading, isAuthenticated, user, requireAuth, allowedRoles, redirectTo, router]);

  if (loading) {
    return <PageLoader />;
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
