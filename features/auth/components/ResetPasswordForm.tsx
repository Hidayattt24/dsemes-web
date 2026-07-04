"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthFormHeader }              from "@/components/auth/AuthFormHeader";
import { AuthBackLink }                from "@/components/auth/AuthBackLink";
import { PasswordField }               from "@/components/ui/PasswordField";
import { PasswordStrengthIndicator }   from "@/components/auth/PasswordStrengthIndicator";
import { Button }                      from "@/components/ui/Button";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/validation/resetPasswordSchema";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { ROUTES }           from "@/constants/routes";

export function ResetPasswordForm() {
  const { isLoading, error, submit } = useResetPassword();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordValue = useWatch({ control, name: "password" });

  return (
    <div className="font-[family-name:var(--font-jakarta)]">
      <AuthFormHeader
        title="Buat Kata Sandi Baru"
        description="Masukkan kata sandi baru untuk akun Anda."
      />

      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-6">
        {error && (
          <div role="alert" className="flex items-center gap-2 p-3 bg-[#FFF5F5] rounded-xl border border-[#C53030]/20">
            <span className="material-symbols-outlined text-[#C53030] text-[18px]">error</span>
            <p className="text-sm font-medium text-[#C53030]">{error}</p>
          </div>
        )}

        <div>
          <PasswordField
            label="Kata Sandi Baru"
            id="password"
            placeholder="••••••••"
            required
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordStrengthIndicator password={passwordValue ?? ""} />
        </div>

        <PasswordField
          label="Konfirmasi Kata Sandi"
          id="confirmPassword"
          placeholder="••••••••"
          required
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" size="lg" className="w-full" loading={isLoading}>
          Simpan Kata Sandi
        </Button>
      </form>

      <AuthBackLink href={ROUTES.VERIFIKASI_KODE} label="Kembali" />
    </div>
  );
}
