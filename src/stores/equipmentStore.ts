import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EquipmentType = 'radio' | 'optics' | 'protection' | 'lighting' | 'accessory';
export type EquipmentStatus = 'active' | 'inactive' | 'charging' | 'error';

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  status: EquipmentStatus;
  battery: number;
  isConnected: boolean;
  iconType: string;
  description: string;
  notes?: string;
  lastUpdated?: string;
}

export interface EquipmentPreferences {
  defaultTab: string;
  showLowBatteryAlerts: boolean;
  autoConnectRadio: boolean;
  sortBy: 'name' | 'status' | 'battery' | 'type';
}

interface EquipmentState {
  equipment: Equipment[];
  preferences: EquipmentPreferences;
  
  // Actions
  setEquipment: (equipment: Equipment[]) => void;
  updateEquipment: (id: string, updates: Partial<Equipment>) => void;
  toggleEquipmentStatus: (id: string) => void;
  addEquipment: (equipment: Equipment) => void;
  removeEquipment: (id: string) => void;
  setPreferences: (preferences: Partial<EquipmentPreferences>) => void;
  resetToDefaults: () => void;
}

const defaultEquipment: Equipment[] = [
  {
    id: 'radio_1',
    name: 'Radio Tattica RT-500',
    type: 'radio',
    status: 'active',
    battery: 85,
    isConnected: true,
    iconType: 'Radio',
    description: 'Radio VHF/UHF dual-band con crittografia',
  },
  {
    id: 'headset_1',
    name: 'Headset Comtac III',
    type: 'radio',
    status: 'active',
    battery: 72,
    isConnected: true,
    iconType: 'Headphones',
    description: 'Cuffie tattiche con cancellazione rumore',
  },
  {
    id: 'optic_1',
    name: 'Red Dot Holosun 510C',
    type: 'optics',
    status: 'active',
    battery: 95,
    isConnected: false,
    iconType: 'Eye',
    description: 'Mirino olografico con solar failsafe',
  },
  {
    id: 'light_1',
    name: 'Torcia Streamlight TLR-1',
    type: 'lighting',
    status: 'inactive',
    battery: 60,
    isConnected: false,
    iconType: 'Flashlight',
    description: 'Torcia tattica 1000 lumen',
  },
  {
    id: 'protection_1',
    name: 'Gilet Tattico Condor',
    type: 'protection',
    status: 'active',
    battery: 100,
    isConnected: false,
    iconType: 'Shield',
    description: 'Plate carrier con MOLLE integrato',
  },
];

const defaultPreferences: EquipmentPreferences = {
  defaultTab: 'all',
  showLowBatteryAlerts: true,
  autoConnectRadio: false,
  sortBy: 'name',
};

export const useEquipmentStore = create<EquipmentState>()(
  persist(
    (set) => ({
      equipment: defaultEquipment,
      preferences: defaultPreferences,
      
      setEquipment: (equipment) => set({ equipment }),
      
      updateEquipment: (id, updates) => set((state) => ({
        equipment: state.equipment.map((e) =>
          e.id === id 
            ? { ...e, ...updates, lastUpdated: new Date().toISOString() } 
            : e
        ),
      })),
      
      toggleEquipmentStatus: (id) => set((state) => ({
        equipment: state.equipment.map((e) =>
          e.id === id
            ? { 
                ...e, 
                status: e.status === 'active' ? 'inactive' : 'active',
                lastUpdated: new Date().toISOString()
              }
            : e
        ),
      })),
      
      addEquipment: (equipment) => set((state) => ({
        equipment: [...state.equipment, { 
          ...equipment, 
          id: `custom_${Date.now()}`,
          lastUpdated: new Date().toISOString() 
        }],
      })),
      
      removeEquipment: (id) => set((state) => ({
        equipment: state.equipment.filter((e) => e.id !== id),
      })),
      
      setPreferences: (preferences) => set((state) => ({
        preferences: { ...state.preferences, ...preferences },
      })),
      
      resetToDefaults: () => set({
        equipment: defaultEquipment,
        preferences: defaultPreferences,
      }),
    }),
    {
      name: 'equipment-storage',
    }
  )
);
