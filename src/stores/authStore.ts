import { create } from 'zustand';
import { User } from '@/types';
import { mockUser, mockRanks } from '@/mocks/data';

// Mock user database for demo
const MOCK_USERS_DB: { email: string; password: string; user: User }[] = [
  {
    email: 'ghost@ticops.it',
    password: 'password123',
    user: mockUser,
  },
  {
    email: 'demo@softwar.it',
    password: 'demo123',
    user: {
      id: '2',
      username: 'demo_player',
      callsign: 'DEMO',
      email: 'demo@softwar.it',
      avatar: undefined,
      rank: mockRanks[1],
      stats: {
        gamesPlayed: 12,
        wins: 6,
        kills: 34,
        deaths: 28,
        accuracy: 52.3,
        xp: 850,
      },
      createdAt: new Date('2024-06-01'),
    },
  },
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User) => void;
  register: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS_DB.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      set({ user: foundUser.user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(foundUser.user));
      return { success: true };
    }
    
    set({ isLoading: false });
    return { success: false, error: 'Email o password non validi' };
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  },
  
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
  
  register: async (email: string, password: string, username: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const exists = MOCK_USERS_DB.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (exists) {
      set({ isLoading: false });
      return { success: false, error: 'Email già registrata' };
    }
    
    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      username,
      callsign: username.toUpperCase().substring(0, 6),
      email,
      avatar: undefined,
      rank: mockRanks[0],
      stats: {
        gamesPlayed: 0,
        wins: 0,
        kills: 0,
        deaths: 0,
        accuracy: 0,
        xp: 0,
      },
      createdAt: new Date(),
    };
    
    // Add to mock DB
    MOCK_USERS_DB.push({ email, password, user: newUser });
    
    set({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return { success: true };
  },
}));

// Initialize from localStorage on app load
const storedUser = localStorage.getItem('currentUser');
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

if (isLoggedIn && storedUser) {
  try {
    const user = JSON.parse(storedUser);
    useAuthStore.setState({ user, isAuthenticated: true });
  } catch {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }
}
