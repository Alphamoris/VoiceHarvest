"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "forest" | "lime" | "gold" | "sky";
  delay?: number;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "forest",
  delay = 0,
}: StatsCardProps) {
  const colorStyles = {
    forest: {
      bg: "bg-forest/10",
      text: "text-forest",
      icon: "text-forest",
    },
    lime: {
      bg: "bg-lime/20",
      text: "text-forest",
      icon: "text-lime",
    },
    gold: {
      bg: "bg-gold/10",
      text: "text-gold",
      icon: "text-gold",
    },
    sky: {
      bg: "bg-sky/10",
      text: "text-sky",
      icon: "text-sky",
    },
  };

  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-soft p-6 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            styles.bg
          )}
        >
          <Icon className={cn("h-6 w-6", styles.icon)} />
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.isPositive ? "text-success" : "text-error"
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p
        className="text-2xl font-bold text-gray-800"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </motion.div>
  );
}
