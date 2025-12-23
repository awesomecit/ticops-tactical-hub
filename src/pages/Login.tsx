import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Apple, Chrome, Crosshair, Loader2, Mail, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import DemoLoginModal from "@/components/auth/DemoLoginModal";

const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(1, "Password richiesta"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Minimo 3 caratteri").max(20, "Massimo 20 caratteri"),
  email: z.string().email("Email non valida"),
  password: z.string().min(8, "Minimo 8 caratteri"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Le password non coincidono",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const Login = () => {
  const { login, register: registerUser, isLoading } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const handleLogin = async (data: LoginFormData) => {
    const result = await login(data.email, data.password);
    
    if (result.success) {
      toast({
        title: "Benvenuto! 👋",
        description: "Login effettuato con successo",
      });
      navigate("/");
    } else {
      toast({
        title: "Errore",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    const result = await registerUser(data.email, data.password, data.username);
    
    if (result.success) {
      toast({
        title: "Account creato! 🎉",
        description: "Benvenuto nella community!",
      });
      navigate("/");
    } else {
      toast({
        title: "Errore",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Social Login",
      description: `Login con ${provider} non disponibile in demo`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <Crosshair className="w-7 h-7 text-primary" />
        </div>
        <span className="text-2xl font-bold text-foreground tracking-tight">
          SoftWar
        </span>
      </div>

      <Card className="w-full max-w-md p-6 md:p-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Accedi</TabsTrigger>
            <TabsTrigger value="register">Registrati</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">Bentornato!</h2>
              <p className="text-muted-foreground mt-2">Accedi al tuo account</p>
            </div>

            {/* Demo Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-primary/50 text-primary hover:bg-primary/10"
              onClick={() => setDemoModalOpen(true)}
            >
              <Users className="w-4 h-4 mr-2" />
              🎮 Accesso Demo Rapido
            </Button>

            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="mario.rossi@email.com"
                  {...loginForm.register("email")}
                  className={cn(loginForm.formState.errors.email && "border-destructive")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-xs text-destructive">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  {...loginForm.register("password")}
                  className={cn(loginForm.formState.errors.password && "border-destructive")}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-xs text-destructive">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Accesso in corso...
                  </>
                ) : (
                  "Accedi"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">oppure</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => handleSocialLogin("Google")}>
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button variant="outline" onClick={() => handleSocialLogin("Apple")}>
                <Apple className="w-4 h-4 mr-2" />
                Apple
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">Crea Account</h2>
              <p className="text-muted-foreground mt-2">Unisciti alla community!</p>
            </div>

            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input
                  id="register-username"
                  placeholder="Il tuo nickname"
                  {...registerForm.register("username")}
                  className={cn(registerForm.formState.errors.username && "border-destructive")}
                />
                {registerForm.formState.errors.username && (
                  <p className="text-xs text-destructive">{registerForm.formState.errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="mario.rossi@email.com"
                  {...registerForm.register("email")}
                  className={cn(registerForm.formState.errors.email && "border-destructive")}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-xs text-destructive">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Minimo 8 caratteri"
                  {...registerForm.register("password")}
                  className={cn(registerForm.formState.errors.password && "border-destructive")}
                />
                {registerForm.formState.errors.password && (
                  <p className="text-xs text-destructive">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirmPassword">Conferma Password</Label>
                <Input
                  id="register-confirmPassword"
                  type="password"
                  placeholder="Ripeti la password"
                  {...registerForm.register("confirmPassword")}
                  className={cn(registerForm.formState.errors.confirmPassword && "border-destructive")}
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-xs text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creazione account...
                  </>
                ) : (
                  "Crea Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">
        Vuoi il wizard completo?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Registrazione avanzata
        </Link>
      </p>

      <DemoLoginModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </div>
  );
};

export default Login;
