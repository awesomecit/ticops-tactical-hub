import { cn } from "@/lib/utils";
import { Check, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface UsernameCheckerProps {
  username: string;
  onAvailabilityChange: (isAvailable: boolean) => void;
}

const TAKEN_USERNAMES = ["admin", "user", "ghost", "sniper", "alpha", "bravo"];

export const UsernameChecker = ({ username, onAvailabilityChange }: UsernameCheckerProps) => {
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");

  useEffect(() => {
    if (!username || username.length < 3) {
      setStatus("idle");
      onAvailabilityChange(false);
      return;
    }

    setStatus("checking");
    
    // Simulate API check
    const timer = setTimeout(() => {
      const isTaken = TAKEN_USERNAMES.includes(username.toLowerCase());
      setStatus(isTaken ? "taken" : "available");
      onAvailabilityChange(!isTaken);
    }, 800);

    return () => clearTimeout(timer);
  }, [username, onAvailabilityChange]);

  if (status === "idle") return null;

  return (
    <div className="flex items-center gap-2 mt-1">
      {status === "checking" && (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Verificando disponibilità...</span>
        </>
      )}
      {status === "available" && (
        <>
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-xs text-green-500">Username disponibile!</span>
        </>
      )}
      {status === "taken" && (
        <>
          <X className="w-4 h-4 text-destructive" />
          <span className="text-xs text-destructive">Username già in uso</span>
        </>
      )}
    </div>
  );
};
