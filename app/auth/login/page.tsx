"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { LoginForm } from "@/components/auth/LoginForm";
import { Loading } from "@/components/common/Loading";

const AuthGuard = dynamic(
  () => import("@/components/auth/AuthGuard").then((mod) => mod.AuthGuard),
  { ssr: false }
);

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-lime/10 px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-forest/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-lime/20 rounded-full blur-3xl" />
        </motion.div>
        <Suspense fallback={<Loading />}>
          <LoginForm />
        </Suspense>
      </div>
    </AuthGuard>
  );
}
