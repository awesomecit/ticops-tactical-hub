import { create } from 'zustand';
import { TutorialProgress } from '@/types';

export const TUTORIAL_STEPS = [
  { id: 'welcome', title: 'Benvenuto', description: 'Introduzione alla piattaforma' },
  { id: 'profile', title: 'Profilo', description: 'Configura il tuo profilo' },
  { id: 'team', title: 'Squadra', description: 'Crea o unisciti a una squadra' },
  { id: 'games', title: 'Partite', description: 'Trova e iscriviti alle partite' },
  { id: 'ranking', title: 'Ranking', description: 'Sistema ELO e classifiche' },
  { id: 'chat', title: 'Chat', description: 'Comunica con altri giocatori' },
  { id: 'shop', title: 'Shop', description: 'Esplora i negozi partner' },
] as const;

export type TutorialStepId = typeof TUTORIAL_STEPS[number]['id'];

interface TutorialState {
  progress: TutorialProgress;
  currentStep: TutorialStepId | null;
  isOpen: boolean;
  
  // Actions
  startTutorial: () => void;
  completeTutorial: () => void;
  completeStep: (stepId: TutorialStepId) => void;
  skipStep: (stepId: TutorialStepId) => void;
  skipAll: () => void;
  resetTutorial: () => void;
  openTutorial: (stepId?: TutorialStepId) => void;
  closeTutorial: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const getStoredProgress = (): TutorialProgress => {
  try {
    const stored = localStorage.getItem('tutorialProgress');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading tutorial progress:', e);
  }
  return {
    completedSteps: [],
    skippedSteps: [],
    isCompleted: false,
    lastStepSeen: undefined,
  };
};

const saveProgress = (progress: TutorialProgress) => {
  try {
    localStorage.setItem('tutorialProgress', JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving tutorial progress:', e);
  }
};

export const useTutorialStore = create<TutorialState>((set, get) => ({
  progress: getStoredProgress(),
  currentStep: null,
  isOpen: false,

  startTutorial: () => {
    const progress: TutorialProgress = {
      completedSteps: [],
      skippedSteps: [],
      isCompleted: false,
      lastStepSeen: 'welcome',
    };
    saveProgress(progress);
    set({ progress, currentStep: 'welcome', isOpen: true });
  },

  completeTutorial: () => {
    const progress: TutorialProgress = {
      ...get().progress,
      isCompleted: true,
    };
    saveProgress(progress);
    set({ progress, isOpen: false, currentStep: null });
  },

  completeStep: (stepId: TutorialStepId) => {
    const { progress } = get();
    if (!progress.completedSteps.includes(stepId)) {
      const newProgress: TutorialProgress = {
        ...progress,
        completedSteps: [...progress.completedSteps, stepId],
        lastStepSeen: stepId,
      };
      saveProgress(newProgress);
      set({ progress: newProgress });
    }
  },

  skipStep: (stepId: TutorialStepId) => {
    const { progress } = get();
    if (!progress.skippedSteps.includes(stepId)) {
      const newProgress: TutorialProgress = {
        ...progress,
        skippedSteps: [...progress.skippedSteps, stepId],
        lastStepSeen: stepId,
      };
      saveProgress(newProgress);
      set({ progress: newProgress });
    }
    get().goToNextStep();
  },

  skipAll: () => {
    const allStepIds = TUTORIAL_STEPS.map(s => s.id);
    const progress: TutorialProgress = {
      completedSteps: [],
      skippedSteps: allStepIds,
      isCompleted: true,
      lastStepSeen: allStepIds[allStepIds.length - 1],
    };
    saveProgress(progress);
    set({ progress, isOpen: false, currentStep: null });
  },

  resetTutorial: () => {
    const progress: TutorialProgress = {
      completedSteps: [],
      skippedSteps: [],
      isCompleted: false,
      lastStepSeen: undefined,
    };
    saveProgress(progress);
    set({ progress });
  },

  openTutorial: (stepId?: TutorialStepId) => {
    const step = stepId || 'welcome';
    set({ isOpen: true, currentStep: step });
  },

  closeTutorial: () => {
    set({ isOpen: false });
  },

  goToNextStep: () => {
    const { currentStep, progress } = get();
    if (!currentStep) return;
    
    const currentIndex = TUTORIAL_STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex < TUTORIAL_STEPS.length - 1) {
      const nextStep = TUTORIAL_STEPS[currentIndex + 1].id;
      const newProgress = { ...progress, lastStepSeen: nextStep };
      saveProgress(newProgress);
      set({ currentStep: nextStep, progress: newProgress });
    } else {
      get().completeTutorial();
    }
  },

  goToPreviousStep: () => {
    const { currentStep } = get();
    if (!currentStep) return;
    
    const currentIndex = TUTORIAL_STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      set({ currentStep: TUTORIAL_STEPS[currentIndex - 1].id });
    }
  },
}));
