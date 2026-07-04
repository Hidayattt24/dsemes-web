"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService }            from "@/services/authService";
import { useForgotPasswordStore } from "@/lib/stores/forgotPasswordStore";
import { ROUTES }                 from "@/constants/routes";
import type { ResetPasswordFormValues } from "@/features/auth/validation/resetPasswordSchema";

interface UseResetPasswordReturn {
  readonly isLoading: boolean;
  readonly error:     string | null;
  readonly submit:    (values: ResetPasswordFormValues) => Promise<void>;
}

export function useResetPassword(): UseResetPasswordReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const { email, code, reset }    = useForgotPasswordStore();
  const router                    = useRouter();

  const submit = async (values: ResetPasswordFormValues): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword(email, code, values.password, values.confirmPassword);
      reset(); // clear session state — flow complete
      router.push(ROUTES.BERHASIL_RESET);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengubah kata sandi. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submit };
}
