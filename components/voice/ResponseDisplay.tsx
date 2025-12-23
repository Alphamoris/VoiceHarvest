"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { useVoice } from "@/context/VoiceContext";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export function ResponseDisplay() {
  const { lastResult, resetState, voiceState } = useVoice();

  if (!lastResult || voiceState === "idle" || voiceState === "recording") {
    return null;
  }

  const isSuccess = lastResult.success;
  const isError = !lastResult.success && !lastResult.suggestions;
  const isPartial = !lastResult.success && lastResult.suggestions;

  const borderColor = isSuccess
    ? "border-success"
    : isError
    ? "border-error"
    : "border-gold";

  const bgColor = isSuccess
    ? "bg-green-50"
    : isError
    ? "bg-red-50"
    : "bg-yellow-50";

  const Icon = isSuccess ? Check : isError ? X : AlertTriangle;
  const iconColor = isSuccess
    ? "text-success"
    : isError
    ? "text-error"
    : "text-gold";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-lg mx-auto"
      >
        <div
          className={cn(
            "relative rounded-xl border-2 p-6",
            borderColor,
            bgColor
          )}
        >
          <button
            onClick={resetState}
            className="absolute top-4 right-4 p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-start gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0.8, 1.2, 1] }}
              transition={{ duration: 0.4 }}
              className={cn(
                "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center",
                isSuccess
                  ? "bg-success"
                  : isError
                  ? "bg-error"
                  : "bg-gold"
              )}
            >
              <Icon className="h-5 w-5 text-white" />
            </motion.div>

            <div className="flex-1">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-semibold text-gray-800 text-lg mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {isSuccess
                  ? "Success!"
                  : isError
                  ? "Something went wrong"
                  : "Almost there!"}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-gray-600 mb-4"
              >
                {lastResult.message}
              </motion.p>

              {lastResult.data && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2 mb-4"
                >
                  {lastResult.data.cropName && (
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-success" />
                      <span>Crop: {lastResult.data.cropName}</span>
                    </li>
                  )}
                  {lastResult.data.quantity && (
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-success" />
                      <span>Quantity: {lastResult.data.quantity} kg</span>
                    </li>
                  )}
                  {lastResult.data.price && (
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-success" />
                      <span>Price: ₹{lastResult.data.price}/kg</span>
                    </li>
                  )}
                  {lastResult.data.listingId && (
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-success" />
                      <span>Listing ID: #{lastResult.data.listingId}</span>
                    </li>
                  )}
                </motion.ul>
              )}

              {lastResult.suggestions && lastResult.suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="mb-4"
                >
                  <p className="text-sm text-gray-600 mb-2">Try saying:</p>
                  <ul className="space-y-1">
                    {lastResult.suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="text-sm text-sky italic"
                      >
                        &ldquo;{suggestion}&rdquo;
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {isSuccess && lastResult.data?.listingId && (
                  <Link
                    href={ROUTES.dashboard.listingDetail(lastResult.data.listingId)}
                  >
                    <Button variant="primary" size="sm" rightIcon={<ExternalLink className="h-4 w-4" />}>
                      View Listing
                    </Button>
                  </Link>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={resetState}
                  leftIcon={<RefreshCw className="h-4 w-4" />}
                >
                  {isSuccess ? "Create Another" : "Try Again"}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
