"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-lime text-gray-800 hover:shadow-lg focus:ring-lime active:scale-95",
        secondary:
          "bg-gray-100 border-2 border-forest text-forest hover:bg-forest hover:text-white focus:ring-forest",
        ghost:
          "bg-transparent text-forest hover:text-lime hover:bg-forest/5 focus:ring-forest",
        danger:
          "bg-error text-white hover:bg-red-700 focus:ring-error active:scale-95",
        outline:
          "border-2 border-gray-300 text-gray-700 hover:border-forest hover:text-forest focus:ring-forest",
        link: "text-forest underline-offset-4 hover:underline focus:ring-forest p-0",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        xl: "px-8 py-4 text-xl",
        icon: "p-2",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        {...(props as HTMLMotionProps<"button">)}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
