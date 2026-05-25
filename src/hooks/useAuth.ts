'use client';

import { create } from 'zustand';
import { authApi } from '@/lib/api';
import { saveTokens, clearTokens, saveUser, loadUser } from '@/lib/auth';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; shopName?: string }) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,

  hydrate: () => {
    const user = loadUser();
    set({ user });
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await authApi.login(email, password);
      saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      saveUser(data.user);
      set({ user: data.user });
    } finally {
      set({ loading: false });
    }
  },

  register: async (payload) => {
    set({ loading: true });
    try {
      const { data } = await authApi.register(payload);
      saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      saveUser(data.user);
      set({ user: data.user });
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    clearTokens();
    set({ user: null });
  },
}));
