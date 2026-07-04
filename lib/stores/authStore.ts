"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@/types/auth";

interface AuthState {
  readonly user: AuthUser | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
}

interface AuthActions {
  setUser: (user: AuthUser) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user:            null,
      isAuthenticated: false,
      isLoading:       false,

      // Actions
      setUser: (user) =>
        set({ user, isAuthenticated: true, isLoading: false }),

      logout: () =>
        set({ user: null, isAuthenticated: false, isLoading: false }),

      setLoading: (isLoading) =>
        set({ isLoading }),
    }),
    {
      name:    "dsmes-auth",
      storage: createJSONStorage(() => localStorage),
      // Only persist user identity — not loading state
      partialize: (state) => ({
        user:            state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
