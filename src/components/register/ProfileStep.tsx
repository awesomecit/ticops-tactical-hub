import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { UsernameChecker } from "./UsernameChecker";

const profileSchema = z.object({
  username: z.string().min(3, "Minimo 3 caratteri").max(20, "Massimo 20 caratteri"),
  region: z.string().min(1, "Seleziona una regione"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const REGIONS = [
  "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
  "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche",
  "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana",
  "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"
];

const DEFAULT_AVATARS = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=ghost",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=sniper",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=assault",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=support",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=recon",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=medic",
];

interface ProfileStepProps {
  onComplete: (data: ProfileFormData & { avatar: string }) => void;
  onBack: () => void;
}

export const ProfileStep = ({ onComplete, onBack }: ProfileStepProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const username = watch("username");

  const handleAvailabilityChange = useCallback((available: boolean) => {
    setIsUsernameAvailable(available);
  }, []);

  const onSubmit = (data: ProfileFormData) => {
    if (!isUsernameAvailable) return;
    onComplete({ ...data, avatar: selectedAvatar });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Il tuo profilo</h2>
        <p className="text-muted-foreground mt-2">Come vuoi essere conosciuto?</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Selection */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src={selectedAvatar} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <Button
              type="button"
              size="icon"
              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2 flex-wrap justify-center">
            {DEFAULT_AVATARS.map((avatar, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedAvatar(avatar)}
                className={cn(
                  "rounded-full p-1 transition-all",
                  selectedAvatar === avatar 
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={avatar} />
                </Avatar>
              </button>
            ))}
          </div>
          
          <Button type="button" variant="ghost" size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            Carica foto
          </Button>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Il tuo nickname"
            {...register("username")}
            className={cn(errors.username && "border-destructive")}
          />
          {errors.username && (
            <p className="text-xs text-destructive">{errors.username.message}</p>
          )}
          <UsernameChecker 
            username={username || ""} 
            onAvailabilityChange={handleAvailabilityChange} 
          />
        </div>

        {/* Region */}
        <div className="space-y-2">
          <Label>Regione</Label>
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={cn(errors.region && "border-destructive")}>
                  <SelectValue placeholder="Seleziona la tua regione" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.region && (
            <p className="text-xs text-destructive">{errors.region.message}</p>
          )}
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Indietro
          </Button>
          <Button 
            type="submit" 
            className="flex-1" 
            disabled={!isValid || !isUsernameAvailable}
          >
            Continua
          </Button>
        </div>
      </form>
    </div>
  );
};
