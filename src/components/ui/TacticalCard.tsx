import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tacticalCardVariants = cva(
  "relative bg-gradient-card border border-border transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default: "clip-tactical",
        small: "clip-tactical-sm",
        large: "clip-tactical-lg",
        flat: "rounded-sm",
      },
      glow: {
        none: "",
        primary: "hover:glow-primary hover:border-primary",
        secondary: "hover:glow-secondary hover:border-secondary",
        accent: "hover:glow-accent hover:border-accent",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      glow: "none",
      interactive: false,
    },
  }
);

export interface TacticalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tacticalCardVariants> {
  scanlines?: boolean;
  hudCorners?: boolean;
}

const TacticalCard = React.forwardRef<HTMLDivElement, TacticalCardProps>(
  ({ className, variant, glow, interactive, scanlines, hudCorners, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          tacticalCardVariants({ variant, glow, interactive }),
          scanlines && "scanlines",
          hudCorners && "hud-corner",
          className
        )}
        {...props}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {children}
      </div>
    );
  }
);

TacticalCard.displayName = "TacticalCard";

const TacticalCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-3 border-b border-border/50", className)}
    {...props}
  />
));
TacticalCardHeader.displayName = "TacticalCardHeader";

const TacticalCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display text-lg font-bold uppercase tracking-wider text-foreground", className)}
    {...props}
  />
));
TacticalCardTitle.displayName = "TacticalCardTitle";

const TacticalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4", className)} {...props} />
));
TacticalCardContent.displayName = "TacticalCardContent";

const TacticalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-3 border-t border-border/50", className)}
    {...props}
  />
));
TacticalCardFooter.displayName = "TacticalCardFooter";

export {
  TacticalCard,
  TacticalCardHeader,
  TacticalCardTitle,
  TacticalCardContent,
  TacticalCardFooter,
  tacticalCardVariants,
};
