import { useCallback, useRef } from 'react';

// Audio context singleton for better performance
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Generate procedural radio sounds
const generateBeep = (ctx: AudioContext, frequency: number, duration: number, type: OscillatorType = 'sine'): AudioBuffer => {
  const sampleRate = ctx.sampleRate;
  const length = duration * sampleRate;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const envelope = Math.min(1, (length - i) / (sampleRate * 0.05)); // Fade out
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
  }
  
  return buffer;
};

const generateStatic = (ctx: AudioContext, duration: number): AudioBuffer => {
  const sampleRate = ctx.sampleRate;
  const length = duration * sampleRate;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < length; i++) {
    // Mix of noise with slight filtering for radio static feel
    const noise = (Math.random() * 2 - 1) * 0.15;
    const crackle = Math.random() > 0.98 ? (Math.random() - 0.5) * 0.4 : 0;
    data[i] = noise + crackle;
  }
  
  return buffer;
};

const generateRoger = (ctx: AudioContext): AudioBuffer => {
  const sampleRate = ctx.sampleRate;
  const duration = 0.15;
  const length = duration * sampleRate;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  
  // Two-tone roger beep (higher then lower)
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const freq = i < length / 2 ? 1200 : 900;
    const envelope = Math.sin((i / length) * Math.PI) * 0.25;
    data[i] = Math.sin(2 * Math.PI * freq * t) * envelope;
  }
  
  return buffer;
};

const generateScanBeep = (ctx: AudioContext, found: boolean): AudioBuffer => {
  const sampleRate = ctx.sampleRate;
  const duration = found ? 0.3 : 0.1;
  const length = duration * sampleRate;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const freq = found ? 880 + (i / length) * 440 : 440;
    const envelope = found 
      ? Math.sin((i / length) * Math.PI) * 0.3
      : (1 - i / length) * 0.2;
    data[i] = Math.sin(2 * Math.PI * freq * t) * envelope;
  }
  
  return buffer;
};

const generateJamming = (ctx: AudioContext, duration: number): AudioBuffer => {
  const sampleRate = ctx.sampleRate;
  const length = duration * sampleRate;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    // Heavy distorted noise with oscillation
    const carrier = Math.sin(2 * Math.PI * 50 * t);
    const noise = (Math.random() * 2 - 1) * 0.4;
    const pulse = Math.sin(2 * Math.PI * 8 * t) > 0 ? 1 : 0.3;
    data[i] = (carrier * 0.2 + noise) * pulse;
  }
  
  return buffer;
};

export type RadioSoundType = 'ptt_start' | 'ptt_end' | 'static' | 'roger' | 'scan' | 'scan_found' | 'jamming' | 'interference';

interface UseRadioSoundsOptions {
  volume?: number;
  enabled?: boolean;
}

export const useRadioSounds = (options: UseRadioSoundsOptions = {}) => {
  const { volume = 0.5, enabled = true } = options;
  const gainNodeRef = useRef<GainNode | null>(null);

  const playSound = useCallback((type: RadioSoundType) => {
    if (!enabled) return;

    try {
      const ctx = getAudioContext();
      
      // Resume context if suspended (autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      let buffer: AudioBuffer;
      
      switch (type) {
        case 'ptt_start':
          buffer = generateBeep(ctx, 1000, 0.08);
          break;
        case 'ptt_end':
          buffer = generateBeep(ctx, 800, 0.05);
          break;
        case 'static':
          buffer = generateStatic(ctx, 0.3);
          break;
        case 'roger':
          buffer = generateRoger(ctx);
          break;
        case 'scan':
          buffer = generateScanBeep(ctx, false);
          break;
        case 'scan_found':
          buffer = generateScanBeep(ctx, true);
          break;
        case 'jamming':
          buffer = generateJamming(ctx, 1);
          break;
        case 'interference':
          buffer = generateStatic(ctx, 0.5);
          break;
        default:
          return;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      
      const gainNode = ctx.createGain();
      gainNode.gain.value = volume;
      gainNodeRef.current = gainNode;
      
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start();

    } catch (error) {
      console.warn('[RadioSounds] Failed to play sound:', error);
    }
  }, [enabled, volume]);

  const playPTTStart = useCallback(() => playSound('ptt_start'), [playSound]);
  const playPTTEnd = useCallback(() => playSound('ptt_end'), [playSound]);
  const playStatic = useCallback(() => playSound('static'), [playSound]);
  const playRoger = useCallback(() => playSound('roger'), [playSound]);
  const playScan = useCallback(() => playSound('scan'), [playSound]);
  const playScanFound = useCallback(() => playSound('scan_found'), [playSound]);
  const playJamming = useCallback(() => playSound('jamming'), [playSound]);
  const playInterference = useCallback(() => playSound('interference'), [playSound]);

  return {
    playSound,
    playPTTStart,
    playPTTEnd,
    playStatic,
    playRoger,
    playScan,
    playScanFound,
    playJamming,
    playInterference,
  };
};
