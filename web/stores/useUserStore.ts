import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { User, LoginFormData, RegisterFormData, ProfileUpdateFormData } from '../schemas/user';
import api from '@/lib/api';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UserActions {
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  updateProfile: (data: ProfileUpdateFormData) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  subscribeWithSelector((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
    login: async (data) => {
      const { data: result } = await api.post('/api/auth/login', data);
      set({ user: result.user, isAuthenticated: true });
    },
    register: async (data) => {
      const { data: result } = await api.post('/api/auth/register', data);
      set({ user: result.user, isAuthenticated: true });
    },
    updateProfile: async (data) => {
      const { data: result } = await api.put('/api/user', data);
      set({ user: result.user, isAuthenticated: true });
    },
    logout: async () => {
      try {
        await api.post('/api/auth/logout');
      } finally {
        set({ user: null, isAuthenticated: false });
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    },
    refreshProfile: async () => {
      set({ isLoading: true });
      try {
        const { data } = await api.get('/api/me');
        if (data.user) {
          set({ user: data.user, isAuthenticated: true, isLoading: false });
        } else {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      } catch (error) {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    },
  }))
);
