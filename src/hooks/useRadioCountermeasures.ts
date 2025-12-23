import { useState, useCallback, useRef, useEffect } from 'react';
import { useRadioStore } from '@/stores/radioStore';
import { useRadioSounds } from '@/hooks/useRadioSounds';
import { toast } from 'sonner';

export type CountermeasureType = 'jamming' | 'frequency_hop' | 'encryption' | 'decoy';

interface CountermeasureStatus {
  type: CountermeasureType;
  isActive: boolean;
  duration: number;
  cooldown: number;
  lastUsed?: Date;
}

interface UseRadioCountermeasuresOptions {
  onScanned?: () => void;
  onJammed?: () => void;
}

export const useRadioCountermeasures = (options: UseRadioCountermeasuresOptions = {}) => {
  const { status } = useRadioStore();
  const { playJamming, playStatic } = useRadioSounds({ volume: 0.5 });
  
  const [isBeingScanned, setIsBeingScanned] = useState(false);
  const [isBeingJammed, setIsBeingJammed] = useState(false);
  const [jammingIntensity, setJammingIntensity] = useState<'low' | 'medium' | 'high'>('low');
  
  const [countermeasures, setCountermeasures] = useState<CountermeasureStatus[]>([
    { type: 'jamming', isActive: false, duration: 10, cooldown: 30, lastUsed: undefined },
    { type: 'frequency_hop', isActive: false, duration: 15, cooldown: 45, lastUsed: undefined },
    { type: 'encryption', isActive: false, duration: 60, cooldown: 120, lastUsed: undefined },
    { type: 'decoy', isActive: false, duration: 20, cooldown: 60, lastUsed: undefined },
  ]);

  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const jamTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if countermeasure is on cooldown
  const isOnCooldown = useCallback((type: CountermeasureType): boolean => {
    const cm = countermeasures.find(c => c.type === type);
    if (!cm || !cm.lastUsed) return false;
    
    const elapsed = (Date.now() - cm.lastUsed.getTime()) / 1000;
    return elapsed < cm.cooldown;
  }, [countermeasures]);

  // Get remaining cooldown time
  const getCooldownRemaining = useCallback((type: CountermeasureType): number => {
    const cm = countermeasures.find(c => c.type === type);
    if (!cm || !cm.lastUsed) return 0;
    
    const elapsed = (Date.now() - cm.lastUsed.getTime()) / 1000;
    return Math.max(0, cm.cooldown - elapsed);
  }, [countermeasures]);

  // Activate a countermeasure
  const activateCountermeasure = useCallback((type: CountermeasureType) => {
    if (isOnCooldown(type)) {
      toast.error(`Contromisura in ricarica (${Math.ceil(getCooldownRemaining(type))}s)`);
      return false;
    }

    const cm = countermeasures.find(c => c.type === type);
    if (!cm) return false;

    setCountermeasures(prev => 
      prev.map(c => 
        c.type === type 
          ? { ...c, isActive: true, lastUsed: new Date() }
          : c
      )
    );

    // Handle specific countermeasure effects
    switch (type) {
      case 'jamming':
        playJamming();
        toast.success('Disturbo radio attivato', {
          description: `Le comunicazioni nemiche saranno disturbate per ${cm.duration}s`,
        });
        break;
      case 'frequency_hop':
        playStatic();
        toast.success('Salto di frequenza attivato', {
          description: `La tua frequenza cambierà automaticamente per ${cm.duration}s`,
        });
        break;
      case 'encryption':
        toast.success('Cifratura avanzata attivata', {
          description: `Le tue comunicazioni sono ora cifrate per ${cm.duration}s`,
        });
        break;
      case 'decoy':
        playStatic();
        toast.success('Esca radio attivata', {
          description: `Stai emettendo segnali falsi per ${cm.duration}s`,
        });
        break;
    }

    // Auto-deactivate after duration
    setTimeout(() => {
      setCountermeasures(prev => 
        prev.map(c => 
          c.type === type 
            ? { ...c, isActive: false }
            : c
        )
      );
      toast.info(`${type === 'jamming' ? 'Disturbo' : type === 'frequency_hop' ? 'Salto frequenza' : type === 'encryption' ? 'Cifratura' : 'Esca'} terminato`);
    }, cm.duration * 1000);

    return true;
  }, [countermeasures, isOnCooldown, getCooldownRemaining, playJamming, playStatic]);

  // Simulate being scanned (for demo/testing)
  const simulateScan = useCallback((duration: number = 3) => {
    setIsBeingScanned(true);
    options.onScanned?.();
    
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
    
    scanTimeoutRef.current = setTimeout(() => {
      setIsBeingScanned(false);
    }, duration * 1000);
  }, [options]);

  // Simulate being jammed (for demo/testing)
  const simulateJamming = useCallback((intensity: 'low' | 'medium' | 'high' = 'medium', duration: number = 5) => {
    setIsBeingJammed(true);
    setJammingIntensity(intensity);
    options.onJammed?.();
    playJamming();
    
    if (jamTimeoutRef.current) {
      clearTimeout(jamTimeoutRef.current);
    }
    
    jamTimeoutRef.current = setTimeout(() => {
      setIsBeingJammed(false);
    }, duration * 1000);
  }, [options, playJamming]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
      if (jamTimeoutRef.current) clearTimeout(jamTimeoutRef.current);
    };
  }, []);

  // Get countermeasure info
  const getCountermeasureInfo = (type: CountermeasureType) => {
    const info = {
      jamming: {
        name: 'Disturbo Radio',
        description: 'Disturba le comunicazioni nemiche nel raggio',
        icon: '📡',
      },
      frequency_hop: {
        name: 'Salto Frequenza',
        description: 'Cambia frequenza automaticamente per evitare intercettazioni',
        icon: '🔀',
      },
      encryption: {
        name: 'Cifratura Avanzata',
        description: 'Rende le comunicazioni impossibili da decifrare',
        icon: '🔐',
      },
      decoy: {
        name: 'Esca Radio',
        description: 'Emette segnali falsi per confondere gli scanner',
        icon: '🎭',
      },
    };
    return info[type];
  };

  return {
    // State
    isBeingScanned,
    isBeingJammed,
    jammingIntensity,
    countermeasures,
    
    // Actions
    activateCountermeasure,
    isOnCooldown,
    getCooldownRemaining,
    getCountermeasureInfo,
    
    // Testing/Demo
    simulateScan,
    simulateJamming,
  };
};
