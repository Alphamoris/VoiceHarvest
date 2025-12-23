"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "ghost";
  hoverable?: boolean;
  clickable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hoverable = false,
      clickable = false,
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-xl transition-all duration-300";

    const variantStyles = {
      default: "bg-white shadow-soft",
      elevated: "bg-white shadow-elevated",
      outline: "bg-white border border-gray-200",
      ghost: "bg-transparent",
    };

    const paddingStyles = {
      none: "",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
    };

    const hoverStyles = hoverable
      ? "hover:shadow-elevated hover:-translate-y-1"
      : "";
    const clickableStyles = clickable ? "cursor-pointer active:scale-[0.99]" : "";

    if (hoverable || clickable) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            baseStyles,
            variantStyles[variant],
            paddingStyles[padding],
            hoverStyles,
            clickableStyles,
            className
          )}
          whileHover={hoverable ? { y: -4 } : undefined}
          whileTap={clickable ? { scale: 0.99 } : undefined}
          {...(props as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold text-gray-800", className)}
    style={{ fontFamily: "var(--font-display)" }}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-600 mt-1", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-4 flex items-center gap-3", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
