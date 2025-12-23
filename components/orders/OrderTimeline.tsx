"use client";

import { motion } from "framer-motion";
import {
  Check,
  Clock,
  Package,
  Truck,
  Home,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import { formatDate, formatTime, cn } from "@/lib/utils";
import type { OrderStatus, OrderTimelineEvent } from "@/types/order";

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  events: OrderTimelineEvent[];
}

const statusSteps: {
  status: OrderStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { status: "PENDING", label: "Order Placed", icon: Clock },
  { status: "CONFIRMED", label: "Confirmed", icon: Check },
  { status: "SHIPPED", label: "Shipped", icon: Truck },
  { status: "DELIVERED", label: "Delivered", icon: Home },
];

const statusOrder: Record<OrderStatus, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  SHIPPED: 2,
  DELIVERED: 3,
  CANCELLED: -1,
  RETURNED: -2,
  REFUNDED: -3,
};

export function OrderTimeline({ currentStatus, events }: OrderTimelineProps) {
  const isCancelled = currentStatus === "CANCELLED";
  const isRefunded = currentStatus === "REFUNDED";
  const currentStepIndex = statusOrder[currentStatus];

  if (isCancelled || isRefunded) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3
          className="text-lg font-semibold text-gray-800 mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Order Timeline
        </h3>
        <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
          <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center">
            {isCancelled ? (
              <XCircle className="h-6 w-6 text-white" />
            ) : (
              <RefreshCcw className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {isCancelled ? "Order Cancelled" : "Order Refunded"}
            </p>
            <p className="text-sm text-gray-500">
              {events.find(
                (e) => e.status === currentStatus
              )?.description || "This order has been cancelled/refunded"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3
        className="text-lg font-semibold text-gray-800 mb-6"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Order Timeline
      </h3>

      <div className="relative">
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const event = events.find((e) => e.status === step.status);
          const Icon = step.icon;

          return (
            <motion.div
              key={step.status}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              {index < statusSteps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-5 top-10 w-0.5 h-full -translate-x-1/2",
                    isCompleted && index < currentStepIndex
                      ? "bg-forest"
                      : "bg-gray-200"
                  )}
                />
              )}

              <motion.div
                animate={
                  isCurrent
                    ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 1.5, repeat: Infinity },
                      }
                    : {}
                }
                className={cn(
                  "relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  isCompleted
                    ? "bg-forest"
                    : "bg-gray-100 border-2 border-gray-200"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isCompleted ? "text-white" : "text-gray-400"
                  )}
                />
              </motion.div>

              <div className="flex-1">
                <p
                  className={cn(
                    "font-medium",
                    isCompleted ? "text-gray-800" : "text-gray-400"
                  )}
                >
                  {step.label}
                </p>
                {event && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {event.description}
                  </p>
                )}
                {event?.timestamp && (
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(event.timestamp)} at {formatTime(event.timestamp)}
                  </p>
                )}
                {isCurrent && !isCompleted && (
                  <p className="text-sm text-gray-400 mt-1">In progress...</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
