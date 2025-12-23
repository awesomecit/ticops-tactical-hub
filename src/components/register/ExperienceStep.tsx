import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Crosshair, Shield, Target, Zap } from "lucide-react";
import { useState } from "react";

interface ExperienceData {
  hasExperience: boolean;
  yearsExperience?: string;
  preferredRole?: string;
  playFrequency: number;
}

interface ExperienceStepProps {
  onComplete: (data: ExperienceData) => void;
  onBack: () => void;
}

const ROLES = [
  { id: "assault", label: "Assault", icon: Zap, description: "Prima linea, azione veloce" },
  { id: "sniper", label: "Sniper", icon: Crosshair, description: "Precisione a distanza" },
  { id: "support", label: "Support", icon: Shield, description: "Supporto tattico" },
  { id: "recon", label: "Recon", icon: Target, description: "Ricognizione e scouting" },
];

const FREQUENCY_LABELS = ["Raramente", "1-2/mese", "Settimanale", "2+/settimana"];

export const ExperienceStep = ({ onComplete, onBack }: ExperienceStepProps) => {
  const [hasExperience, setHasExperience] = useState(false);
  const [yearsExperience, setYearsExperience] = useState<string>("");
  const [preferredRole, setPreferredRole] = useState<string>("");
  const [playFrequency, setPlayFrequency] = useState([1]);

  const handleSubmit = () => {
    onComplete({
      hasExperience,
      yearsExperience: hasExperience ? yearsExperience : undefined,
      preferredRole: hasExperience ? preferredRole : undefined,
      playFrequency: playFrequency[0],
    });
  };

  const isValid = !hasExperience || (yearsExperience && preferredRole);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">La tua esperienza</h2>
        <p className="text-muted-foreground mt-2">Raccontaci di più su di te</p>
      </div>

      <div className="space-y-6">
        {/* Experience Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
          <div>
            <Label className="text-base font-medium">Hai già giocato a softair?</Label>
            <p className="text-sm text-muted-foreground">
              {hasExperience ? "Ottimo! Raccontaci di più" : "Nessun problema, tutti iniziano da qualche parte!"}
            </p>
          </div>
          <Switch
            checked={hasExperience}
            onCheckedChange={setHasExperience}
          />
        </div>

        {/* Experience Details */}
        {hasExperience && (
          <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
            {/* Years of Experience */}
            <div className="space-y-2">
              <Label>Anni di esperienza</Label>
              <Select value={yearsExperience} onValueChange={setYearsExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1">Meno di 1 anno</SelectItem>
                  <SelectItem value="1-2">1-2 anni</SelectItem>
                  <SelectItem value="3-5">3-5 anni</SelectItem>
                  <SelectItem value="5+">5+ anni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preferred Role */}
            <div className="space-y-3">
              <Label>Ruolo preferito</Label>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setPreferredRole(role.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 text-left transition-all",
                        preferredRole === role.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <Icon className={cn(
                        "w-6 h-6 mb-2",
                        preferredRole === role.id ? "text-primary" : "text-muted-foreground"
                      )} />
                      <p className="font-medium text-foreground">{role.label}</p>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Play Frequency */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Con che frequenza vuoi giocare?</Label>
            <span className="text-sm font-medium text-primary">
              {FREQUENCY_LABELS[playFrequency[0]]}
            </span>
          </div>
          <Slider
            value={playFrequency}
            onValueChange={setPlayFrequency}
            max={3}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            {FREQUENCY_LABELS.map((label, i) => (
              <span key={i} className={cn(playFrequency[0] === i && "text-primary font-medium")}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Indietro
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="flex-1" 
            disabled={!isValid}
          >
            Continua
          </Button>
        </div>
      </div>
    </div>
  );
};
