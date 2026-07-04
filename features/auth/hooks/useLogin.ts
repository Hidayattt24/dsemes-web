"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/lib/stores/authStore";
import { ROUTES } from "@/constants/routes";
import type { LoginCredentials } from "@/types/auth";

interface UseLoginReturn {
  readonly isLoading: boolean;
  readonly error:     string | null;
  readonly submit:    (credentials: LoginCredentials) => Promise<void>;
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const { setUser }               = useAuthStore();
  const router                    = useRouter();

  const submit = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const { user } = await authService.login(credentials);
      setUser(user);
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submit };
}
