"use client";

import { motion } from "framer-motion";
import { Check, X, AlertTriangle, Clock, RotateCcw, Eye } from "lucide-react";
import { useVoice } from "@/context/VoiceContext";
import { formatTime, formatRelativeTime, cn } from "@/lib/utils";
import { NoHistory } from "@/components/common/EmptyState";

export function CommandHistory() {
  const { commandHistory } = useVoice();

  if (commandHistory.length === 0) {
    return <NoHistory />;
  }

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      CREATE_LISTING: "Created Listing",
      UPDATE_LISTING: "Updated Listing",
      DELETE_LISTING: "Deleted Listing",
      CHECK_ORDERS: "Checked Orders",
      UPDATE_INVENTORY: "Updated Inventory",
      GET_PRICE: "Price Check",
      UNKNOWN: "Unknown Command",
    };
    return labels[action] || action;
  };

  return (
    <div className="w-full">
      <h3
        className="text-lg font-semibold text-gray-800 mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Recent Commands
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
        {commandHistory.map((command, index) => {
          const isSuccess = command.result.success;
          const borderColor = isSuccess ? "border-l-success" : "border-l-error";
          const Icon = isSuccess ? Check : X;
          const iconBg = isSuccess ? "bg-green-100" : "bg-red-100";
          const iconColor = isSuccess ? "text-success" : "text-error";

          return (
            <motion.div
              key={command.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "bg-cream border-l-4 rounded-lg p-4",
                borderColor
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                    iconBg
                  )}
                >
                  <Icon className={cn("h-4 w-4", iconColor)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(command.timestamp)}
                    </span>
                    <span className="text-xs font-medium text-gray-700">
                      {getActionLabel(command.action)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 italic mb-2 line-clamp-2">
                    &ldquo;{command.transcription}&rdquo;
                  </p>

                  <p className="text-xs text-gray-500">
                    {command.result.message}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
