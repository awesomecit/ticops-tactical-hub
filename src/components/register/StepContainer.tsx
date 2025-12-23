import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StepContainerProps {
  children: ReactNode;
  direction?: "left" | "right";
  isActive: boolean;
}

export const StepContainer = ({ children, isActive }: StepContainerProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out",
        isActive 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 translate-x-8 absolute pointer-events-none"
      )}
    >
      {children}
    </div>
  );
};
