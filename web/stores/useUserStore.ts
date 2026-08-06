import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { User } from '../schemas/user';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UserActions {
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  subscribeWithSelector((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
    logout: () => set({ user: null, isAuthenticated: false }),
  }))
);
