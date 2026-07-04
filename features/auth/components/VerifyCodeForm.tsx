"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthFormHeader }        from "@/components/auth/AuthFormHeader";
import { AuthBackLink }          from "@/components/auth/AuthBackLink";
import { VerificationCodeInput } from "@/components/ui/VerificationCodeInput";
import { Button }                from "@/components/ui/Button";

import {
  verifyCodeSchema,
  type VerifyCodeFormValues,
} from "@/features/auth/validation/verifyCodeSchema";
import { useVerifyCode }  from "@/features/auth/hooks/useVerifyCode";
import { useCountdown }   from "@/hooks/useCountdown";
import { ROUTES }         from "@/constants/routes";

export function VerifyCodeForm() {
  const { email, isLoading, error, submit, resendCode } = useVerifyCode();
  const { seconds, isFinished, restart }                = useCountdown(60);
  const [resendLoading, setResendLoading]               = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  const handleResend = async (): Promise<void> => {
    setResendLoading(true);
    await resendCode();
    setResendLoading(false);
    restart();
  };

  return (
    <div className="font-[family-name:var(--font-jakarta)]">
      <AuthFormHeader
        title="Verifikasi Kode"
        description={`Masukkan 6 digit kode verifikasi yang telah dikirim ke ${email || "email Anda"}.`}
      />

      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-6">
        {error && (
          <div role="alert" className="flex items-center gap-2 p-3 bg-[#FFF5F5] rounded-xl border border-[#C53030]/20">
            <span className="material-symbols-outlined text-[#C53030] text-[18px]">error</span>
            <p className="text-sm font-medium text-[#C53030]">{error}</p>
          </div>
        )}

        {/* OTP input */}
        <div>
          <p className="text-sm font-semibold text-[#3e4946] mb-3">Kode Verifikasi *</p>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <VerificationCodeInput
                value={field.value}
                onChange={field.onChange}
                error={errors.code?.message}
              />
            )}
          />
        </div>

        {/* Resend countdown */}
        <div className="text-center">
          {isFinished ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-sm font-bold text-[#004f45] hover:underline decoration-2 underline-offset-4 disabled:opacity-50"
            >
              {resendLoading ? "Mengirim..." : "Kirim Ulang Kode"}
            </button>
          ) : (
            <p className="text-sm text-[#6e7976]">
              Kirim ulang dalam{" "}
              <span className="font-bold text-[#1b1c1c] tabular-nums">{seconds}s</span>
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" loading={isLoading}>
          Verifikasi
        </Button>
      </form>

      <AuthBackLink href={ROUTES.LUPA_PASSWORD} label="Kembali" />
    </div>
  );
}
