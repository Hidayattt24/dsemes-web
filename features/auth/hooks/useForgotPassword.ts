"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService }            from "@/services/authService";
import { useForgotPasswordStore } from "@/lib/stores/forgotPasswordStore";
import { ROUTES }                 from "@/constants/routes";
import type { ForgotPasswordFormValues } from "@/features/auth/validation/forgotPasswordSchema";

interface UseForgotPasswordReturn {
  readonly isLoading: boolean;
  readonly error:     string | null;
  readonly submit:    (values: ForgotPasswordFormValues) => Promise<void>;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const { setEmail }              = useForgotPasswordStore();
  const router                    = useRouter();

  const submit = async (values: ForgotPasswordFormValues): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(values.email);
      setEmail(values.email);
      router.push(ROUTES.VERIFIKASI_KODE);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim kode. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submit };
}
