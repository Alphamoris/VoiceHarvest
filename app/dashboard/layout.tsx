"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Menu, X } from "lucide-react";
import { PageLoader } from "@/components/common/Loading";

const AuthGuard = dynamic(
  () => import("@/components/auth/AuthGuard").then((mod) => mod.AuthGuard),
  { ssr: false, loading: () => <PageLoader /> }
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard requireAuth={true} redirectTo="/auth/login">
      <div className="min-h-screen bg-gray-50">
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden"
              >
                <div className="absolute right-2 top-2">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 z-30">
          <Sidebar />
        </div>

        <div className="lg:ml-64">
          <main className="min-h-screen pt-16 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 lg:p-8"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
