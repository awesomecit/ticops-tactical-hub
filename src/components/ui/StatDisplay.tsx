import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  size?: "sm" | "md" | "lg";
}

const StatDisplay = React.forwardRef<HTMLDivElement, StatDisplayProps>(
  ({ className, label, value, icon: Icon, trend, trendValue, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: {
        container: "p-2",
        value: "text-lg",
        label: "text-xs",
      },
      md: {
        container: "p-3",
        value: "text-2xl",
        label: "text-xs",
      },
      lg: {
        container: "p-4",
        value: "text-3xl",
        label: "text-sm",
      },
    };

    const trendColors = {
      up: "text-secondary",
      down: "text-destructive",
      neutral: "text-muted-foreground",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1",
          sizeClasses[size].container,
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          {Icon && <Icon className="h-4 w-4" />}
          <span className={cn("font-display uppercase tracking-wider", sizeClasses[size].label)}>
            {label}
          </span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className={cn("font-mono font-bold text-foreground", sizeClasses[size].value)}>
            {value}
          </span>
          
          {trend && trendValue && (
            <span className={cn("text-xs font-mono", trendColors[trend])}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trendValue}
            </span>
          )}
        </div>
      </div>
    );
  }
);

StatDisplay.displayName = "StatDisplay";

export { StatDisplay };
