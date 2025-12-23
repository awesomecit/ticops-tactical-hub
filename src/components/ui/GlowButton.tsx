import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glowButtonVariants = cva(
  "relative inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 clip-tactical-sm overflow-hidden group",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "hover:glow-primary hover:scale-105",
          "active:scale-95",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:glow-secondary hover:scale-105",
          "active:scale-95",
        ],
        accent: [
          "bg-accent text-accent-foreground",
          "hover:glow-accent hover:scale-105",
          "active:scale-95",
        ],
        outline: [
          "border-2 border-primary bg-transparent text-primary",
          "hover:bg-primary hover:text-primary-foreground hover:glow-primary",
          "active:scale-95",
        ],
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted hover:text-primary",
          "active:scale-95",
        ],
        tactical: [
          "bg-card border border-border text-foreground",
          "hover:border-primary hover:text-primary",
          "active:scale-95",
        ],
        danger: [
          "bg-destructive text-destructive-foreground",
          "hover:opacity-90 hover:scale-105",
          "active:scale-95",
        ],
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glowButtonVariants> {
  loading?: boolean;
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(glowButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton, glowButtonVariants };
