"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";
import type { LoginCredentials } from "@/types/auth";

interface UseLoginReturn {
  readonly isLoading: boolean;
  readonly error:     string | null;
  readonly submit:    (credentials: LoginCredentials) => Promise<void>;
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const { login }                 = useAuth();
  const { showToast }             = useToast();

  const submit = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await login(credentials);
      showToast({
        type: "success",
        title: "Login Berhasil",
        description: "Selamat datang kembali di Digital DSMES Aceh.",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login gagal. Coba lagi.";
      setError(msg);
      showToast({
        type: "error",
        title: "Login Gagal",
        description: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submit };
}
