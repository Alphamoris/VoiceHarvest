"use client";

import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  Mic,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { formatRelativeTime, cn } from "@/lib/utils";

interface Activity {
  id: string;
  type:
    | "listing_created"
    | "order_received"
    | "order_shipped"
    | "order_delivered"
    | "voice_command"
    | "price_alert"
    | "payment_received";
  title: string;
  description: string;
  timestamp: Date;
  status?: "success" | "warning" | "info";
}

interface RecentActivityProps {
  activities: Activity[];
  maxItems?: number;
}

const activityConfig = {
  listing_created: {
    icon: Package,
    color: "text-forest",
    bg: "bg-forest/10",
  },
  order_received: {
    icon: ShoppingCart,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  order_shipped: {
    icon: Clock,
    color: "text-sky",
    bg: "bg-sky/10",
  },
  order_delivered: {
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
  },
  voice_command: {
    icon: Mic,
    color: "text-lime",
    bg: "bg-lime/20",
  },
  price_alert: {
    icon: TrendingUp,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  payment_received: {
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
  },
};

export function RecentActivity({
  activities,
  maxItems = 5,
}: RecentActivityProps) {
  const displayActivities = activities.slice(0, maxItems);

  if (displayActivities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h2
          className="text-lg font-semibold text-gray-800 mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Recent Activity
        </h2>
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h2
        className="text-lg font-semibold text-gray-800 mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Recent Activity
      </h2>

      <div className="space-y-4">
        {displayActivities.map((activity, index) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  config.bg
                )}
              >
                <Icon className={cn("h-5 w-5", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {formatRelativeTime(activity.timestamp)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
