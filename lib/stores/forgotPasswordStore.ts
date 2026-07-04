"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Persists the email and OTP code across the 3-step forgot-password flow.
 * Cleared on completion or when the user returns to login.
 */

interface ForgotPasswordState {
  readonly email: string;
  readonly code:  string;
}

interface ForgotPasswordActions {
  setEmail: (email: string) => void;
  setCode:  (code: string)  => void;
  reset:    ()              => void;
}

type ForgotPasswordStore = ForgotPasswordState & ForgotPasswordActions;

export const useForgotPasswordStore = create<ForgotPasswordStore>()(
  persist(
    (set) => ({
      email: "",
      code:  "",
      setEmail: (email) => set({ email }),
      setCode:  (code)  => set({ code }),
      reset:    ()      => set({ email: "", code: "" }),
    }),
    {
      name:    "dsmes-forgot-password",
      storage: createJSONStorage(() => sessionStorage), // session only — not localStorage
    }
  )
);
