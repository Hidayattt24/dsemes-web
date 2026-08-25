"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Persists the email across the 2-step forgot-password flow.
 * Cleared on completion or when the user returns to login.
 */

interface ForgotPasswordState {
  readonly email: string;
}

interface ForgotPasswordActions {
  setEmail: (email: string) => void;
  reset:    ()              => void;
}

type ForgotPasswordStore = ForgotPasswordState & ForgotPasswordActions;

export const useForgotPasswordStore = create<ForgotPasswordStore>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email) => set({ email }),
      reset:    ()      => set({ email: "" }),
    }),
    {
      name:    "dsmes-forgot-password",
      storage: createJSONStorage(() => sessionStorage), // session only — not localStorage
    }
  )
);
