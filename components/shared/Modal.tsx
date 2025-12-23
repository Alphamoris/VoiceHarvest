"use client";

import { Fragment, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "w-full bg-white rounded-xl shadow-deep p-6 relative",
                sizeClasses[size],
                className
              )}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "modal-title" : undefined}
              aria-describedby={description ? "modal-description" : undefined}
            >
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              {(title || description) && (
                <div className="mb-4">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-xl font-semibold text-gray-800"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-description" className="text-sm text-gray-600 mt-1">
                      {description}
                    </p>
                  )}
                </div>
              )}
              {children}
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn("mt-6 flex items-center justify-end gap-3", className)}>
      {children}
    </div>
  );
}
