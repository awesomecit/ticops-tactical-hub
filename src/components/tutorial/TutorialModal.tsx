import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Check,
  User,
  Users,
  Gamepad2,
  Trophy,
  MessageSquare,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useTutorialStore, TUTORIAL_STEPS, TutorialStepId } from '@/stores/tutorialStore';

const STEP_ICONS: Record<TutorialStepId, React.ReactNode> = {
  welcome: <Sparkles className="w-8 h-8" />,
  profile: <User className="w-8 h-8" />,
  team: <Users className="w-8 h-8" />,
  games: <Gamepad2 className="w-8 h-8" />,
  ranking: <Trophy className="w-8 h-8" />,
  chat: <MessageSquare className="w-8 h-8" />,
  shop: <ShoppingBag className="w-8 h-8" />,
};

const STEP_CONTENT: Record<TutorialStepId, { title: string; description: string; tips: string[] }> = {
  welcome: {
    title: 'Benvenuto su SoftWar!',
    description: 'La piattaforma definitiva per il gaming tattico. Organizza partite, scala le classifiche e connettiti con altri giocatori.',
    tips: [
      'Naviga usando il menu laterale o la barra in basso',
      'Personalizza le impostazioni dal profilo',
      'Esplora le partite disponibili nella tua zona',
    ],
  },
  profile: {
    title: 'Il Tuo Profilo',
    description: 'Configura il tuo profilo per farti riconoscere in campo. Aggiungi foto, callsign e dettagli.',
    tips: [
      'Scegli un callsign memorabile',
      'Aggiungi una foto profilo',
      'Collega i tuoi social per trovare amici',
    ],
  },
  team: {
    title: 'Squadre',
    description: 'Unisciti a una squadra esistente o creane una tua. Collabora, comunica e domina insieme.',
    tips: [
      'Cerca squadre nella tua zona',
      'Invita amici nella tua squadra',
      'Partecipa a tornei come team',
    ],
  },
  games: {
    title: 'Partite',
    description: 'Trova partite nella tua zona, iscriviti e preparati per l\'azione. Filtra per data, location e tipo.',
    tips: [
      'Usa i filtri per trovare partite adatte',
      'Controlla l\'equipaggiamento richiesto',
      'Arriva in anticipo per il briefing',
    ],
  },
  ranking: {
    title: 'Sistema Ranking',
    description: 'Il sistema ELO traccia le tue performance. Vinci partite per salire in classifica e sbloccare tier.',
    tips: [
      'Ogni vittoria aumenta il tuo ELO',
      'I tier sbloccano badge esclusivi',
      'Compete nella classifica settimanale',
    ],
  },
  chat: {
    title: 'Chat & Comunicazione',
    description: 'Resta in contatto con il tuo team e altri giocatori. Coordinate le strategie e organizza partite.',
    tips: [
      'Usa la chat di squadra per strategie',
      'Crea gruppi per organizzare eventi',
      'Rispondi rapidamente agli inviti',
    ],
  },
  shop: {
    title: 'Shop',
    description: 'Esplora i negozi partner per equipaggiamento, repliche e accessori. Confronta prezzi e leggi recensioni.',
    tips: [
      'Filtra per categoria e prezzo',
      'Controlla la disponibilità',
      'Leggi le recensioni prima di acquistare',
    ],
  },
};

const TutorialModal = () => {
  const { 
    isOpen, 
    currentStep, 
    progress,
    closeTutorial, 
    completeStep, 
    skipStep, 
    skipAll,
    goToNextStep,
    goToPreviousStep 
  } = useTutorialStore();

  if (!currentStep) return null;

  const currentIndex = TUTORIAL_STEPS.findIndex(s => s.id === currentStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === TUTORIAL_STEPS.length - 1;
  const progressPercent = ((currentIndex + 1) / TUTORIAL_STEPS.length) * 100;
  const content = STEP_CONTENT[currentStep];
  const icon = STEP_ICONS[currentStep];

  const handleNext = () => {
    completeStep(currentStep);
    goToNextStep();
  };

  const handleSkip = () => {
    skipStep(currentStep);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeTutorial()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">
              {currentIndex + 1} / {TUTORIAL_STEPS.length}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={skipAll}
              className="text-muted-foreground"
            >
              Salta tutto
            </Button>
          </div>
          <Progress value={progressPercent} className="mt-2" />
        </DialogHeader>

        <div className="py-6">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            {icon}
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">{content.title}</h2>
            <p className="text-muted-foreground">{content.description}</p>
          </div>

          {/* Tips */}
          <Card className="mt-6 p-4 bg-muted/50">
            <h4 className="font-medium mb-3 text-sm">💡 Suggerimenti</h4>
            <ul className="space-y-2">
              {content.tips.map((tip, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="ghost"
            onClick={goToPreviousStep}
            disabled={isFirstStep}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Indietro
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSkip}>
              Salta
            </Button>
            <Button onClick={handleNext}>
              {isLastStep ? 'Completa' : 'Avanti'}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
