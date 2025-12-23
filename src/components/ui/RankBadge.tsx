import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Rank } from "@/types";

const rankBadgeVariants = cva(
  "inline-flex items-center gap-2 font-display font-bold uppercase tracking-wider clip-tactical-sm",
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
      variant: {
        default: "bg-muted text-muted-foreground",
        bronze: "bg-amber-900/30 text-amber-500 border border-amber-700/50",
        silver: "bg-slate-600/30 text-slate-300 border border-slate-500/50",
        gold: "bg-accent/20 text-accent border border-accent/50",
        platinum: "bg-cyan-900/30 text-cyan-400 border border-cyan-600/50",
        diamond: "bg-purple-900/30 text-purple-400 border border-purple-600/50",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

function getRankVariant(level: number): "default" | "bronze" | "silver" | "gold" | "platinum" | "diamond" {
  if (level <= 1) return "default";
  if (level <= 2) return "bronze";
  if (level <= 3) return "silver";
  if (level <= 4) return "gold";
  if (level <= 5) return "platinum";
  return "diamond";
}

export interface RankBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof rankBadgeVariants>, 'variant'> {
  rank: Rank;
  showLevel?: boolean;
  showIcon?: boolean;
}

const RankBadge = React.forwardRef<HTMLDivElement, RankBadgeProps>(
  ({ className, rank, size, showLevel = false, showIcon = true, ...props }, ref) => {
    const variant = getRankVariant(rank.level);
    
    return (
      <div
        ref={ref}
        className={cn(rankBadgeVariants({ size, variant }), className)}
        {...props}
      >
        {showIcon && <span className="text-base">{rank.icon}</span>}
        <span>{rank.name}</span>
        {showLevel && (
          <span className="font-mono text-xs opacity-70">LVL {rank.level}</span>
        )}
      </div>
    );
  }
);

RankBadge.displayName = "RankBadge";

export { RankBadge, rankBadgeVariants };
