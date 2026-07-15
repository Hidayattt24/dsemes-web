"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService }            from "@/services/authService";
import { useForgotPasswordStore } from "@/lib/stores/forgotPasswordStore";
import { ROUTES }                 from "@/constants/routes";
import { useToast }               from "@/components/ui/Toast";
import type { VerifyCodeFormValues } from "@/features/auth/validation/verifyCodeSchema";

interface UseVerifyCodeReturn {
  readonly email:      string;
  readonly isLoading:  boolean;
  readonly error:      string | null;
  readonly submit:     (values: VerifyCodeFormValues) => Promise<void>;
  readonly resendCode: () => Promise<void>;
}

export function useVerifyCode(): UseVerifyCodeReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const { email, setCode }        = useForgotPasswordStore();
  const { showToast }             = useToast();
  const router                    = useRouter();

  const submit = async (values: VerifyCodeFormValues): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.verifyResetCode(email, values.code);
      setCode(values.code);
      showToast({
        type: "success",
        title: "Verifikasi Berhasil",
        description: "Kode verifikasi valid. Silakan atur ulang kata sandi Anda.",
      });
      router.push(ROUTES.ATUR_ULANG_KATA_SANDI);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Verifikasi gagal. Coba lagi.";
      setError(msg);
      showToast({
        type: "error",
        title: "Verifikasi Gagal",
        description: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async (): Promise<void> => {
    setError(null);
    try {
      await authService.forgotPassword(email);
      showToast({
        type: "success",
        title: "Kode Terkirim",
        description: "Kode verifikasi baru telah dikirim ke email Anda.",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal mengirim ulang kode.";
      setError(msg);
      showToast({
        type: "error",
        title: "Gagal Mengirim Kode",
        description: msg,
      });
    }
  };

  return { email, isLoading, error, submit, resendCode };
}
