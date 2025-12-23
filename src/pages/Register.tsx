import { Card } from "@/components/ui/card";
import {
  AuthMethodStep,
  ExperienceStep,
  ProfileStep,
  StepContainer,
  TeamStep,
  WizardProgress,
} from "@/components/register";
import { useToast } from "@/hooks/use-toast";
import { Crosshair, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const STEP_LABELS = ["Account", "Profilo", "Esperienza", "Team"];

interface RegistrationData {
  authMethod?: string;
  email?: string;
  username?: string;
  avatar?: string;
  region?: string;
  hasExperience?: boolean;
  yearsExperience?: string;
  preferredRole?: string;
  playFrequency?: number;
  hasTeam?: boolean;
  selectedTeamId?: string;
}

const Register = () => {
  const [searchParams] = useSearchParams();
  const isBetaTester = searchParams.get('beta') === 'true';
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateData = (newData: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...newData }));
  };

  const handleAuthComplete = (method: string, data?: { email: string }) => {
    updateData({ 
      authMethod: method, 
      email: data?.email 
    });
    setCurrentStep(2);
  };

  const handleProfileComplete = (data: { username: string; region: string; avatar: string }) => {
    updateData(data);
    setCurrentStep(3);
  };

  const handleExperienceComplete = (data: {
    hasExperience: boolean;
    yearsExperience?: string;
    preferredRole?: string;
    playFrequency: number;
  }) => {
    updateData(data);
    setCurrentStep(4);
  };

  const handleTeamComplete = (data: { hasTeam: boolean; selectedTeamId?: string }) => {
    const finalData = { ...registrationData, ...data };
    
    // Save to localStorage for demo
    localStorage.setItem("registrationData", JSON.stringify(finalData));
    localStorage.setItem("isRegistered", "true");
    
    toast({
      title: "Registrazione completata! 🎉",
      description: "Benvenuto nella community!",
    });

    // Redirect to dashboard
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
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
        {isBetaTester && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-primary">🌟 Benvenuto Beta Tester!</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Grazie per far parte dei primi a testare TicOps. Come beta tester avrai:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Accesso anticipato alle nuove funzionalità
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Supporto prioritario dal team
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Badge esclusivo "Early Adopter"
              </li>
            </ul>
          </div>
        )}
        
        <WizardProgress
          currentStep={currentStep}
          totalSteps={4}
          stepLabels={STEP_LABELS}
        />

        <div className="relative min-h-[400px]">
          <StepContainer isActive={currentStep === 1}>
            <AuthMethodStep onComplete={handleAuthComplete} />
          </StepContainer>

          <StepContainer isActive={currentStep === 2}>
            <ProfileStep onComplete={handleProfileComplete} onBack={goBack} />
          </StepContainer>

          <StepContainer isActive={currentStep === 3}>
            <ExperienceStep onComplete={handleExperienceComplete} onBack={goBack} />
          </StepContainer>

          <StepContainer isActive={currentStep === 4}>
            <TeamStep onComplete={handleTeamComplete} onBack={goBack} />
          </StepContainer>
        </div>
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">
        Hai già un account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Accedi
        </a>
      </p>
    </div>
  );
};

export default Register;
