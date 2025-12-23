import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Apple, Chrome, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(8, "Minimo 8 caratteri"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Le password non coincidono",
  path: ["confirmPassword"],
});

type EmailFormData = z.infer<typeof emailSchema>;

interface AuthMethodStepProps {
  onComplete: (method: string, data?: EmailFormData) => void;
}

export const AuthMethodStep = ({ onComplete }: AuthMethodStepProps) => {
  const [authMethod, setAuthMethod] = useState<"google" | "apple" | "email" | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const handleSocialAuth = (method: "google" | "apple") => {
    // Simulate social auth
    onComplete(method);
  };

  const onEmailSubmit = (data: EmailFormData) => {
    onComplete("email", data);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Crea il tuo account</h2>
        <p className="text-muted-foreground mt-2">Scegli come vuoi registrarti</p>
      </div>

      {!authMethod ? (
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 gap-3"
            onClick={() => handleSocialAuth("google")}
          >
            <Chrome className="w-5 h-5" />
            Continua con Google
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-12 gap-3"
            onClick={() => handleSocialAuth("apple")}
          >
            <Apple className="w-5 h-5" />
            Continua con Apple
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">oppure</span>
            </div>
          </div>
          
          <Button
            variant="secondary"
            className="w-full h-12 gap-3"
            onClick={() => setAuthMethod("email")}
          >
            <Mail className="w-5 h-5" />
            Registrati con Email
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
          <Button
            type="button"
            variant="ghost"
            className="mb-2"
            onClick={() => setAuthMethod(null)}
          >
            ← Torna indietro
          </Button>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mario.rossi@email.com"
              {...register("email")}
              className={cn(errors.email && "border-destructive")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimo 8 caratteri"
              {...register("password")}
              className={cn(errors.password && "border-destructive")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Conferma Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Ripeti la password"
              {...register("confirmPassword")}
              className={cn(errors.confirmPassword && "border-destructive")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full h-12" disabled={!isValid}>
            Continua
          </Button>
        </form>
      )}
    </div>
  );
};
