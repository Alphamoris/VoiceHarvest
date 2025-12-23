"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToast, ToastType } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const toastStyles: Record<ToastType, string> = {
  success: "border-l-green-500 bg-green-50",
  error: "border-l-red-500 bg-red-50",
  warning: "border-l-yellow-500 bg-yellow-50",
  info: "border-l-blue-500 bg-blue-50",
};

export function ToastContainer() {
  const { toasts, hideToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "flex items-start gap-3 p-4 bg-white rounded-lg shadow-elevated border-l-4",
              toastStyles[toast.type]
            )}
            role="alert"
            aria-live="polite"
          >
            <div className="flex-shrink-0">{toastIcons[toast.type]}</div>
            <p className="flex-1 text-sm text-gray-800">{toast.message}</p>
            <button
              onClick={() => hideToast(toast.id)}
              className="flex-shrink-0 p-1 rounded hover:bg-gray-100 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
