"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
        primary: "bg-forest text-white",
        secondary: "bg-lime text-gray-800",
        outline: "border border-gray-300 text-gray-700",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      pulse: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pulse: false,
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, pulse, dot, dotColor, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, pulse, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "mr-1.5 h-2 w-2 rounded-full",
              dotColor || "bg-current"
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
