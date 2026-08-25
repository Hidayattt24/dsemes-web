"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthFormHeader } from "@/components/auth/AuthFormHeader";
import { AuthBackLink }   from "@/components/auth/AuthBackLink";
import { InputField }     from "@/components/ui/InputField";
import { Button }         from "@/components/ui/Button";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/validation/forgotPasswordSchema";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

export function ForgotPasswordForm() {
  const { isLoading, error, submit } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  return (
    <div className="font-[family-name:var(--font-jakarta)]">
      <AuthFormHeader
        title="Lupa Kata Sandi"
        description="Masukkan alamat email yang terdaftar untuk mengatur ulang kata sandi Anda."
      />

      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-6">
        {error && (
          <div role="alert" className="flex items-center gap-2 p-3 bg-[#FFF5F5] rounded-xl border border-[#C53030]/20">
            <span className="material-symbols-outlined text-[#C53030] text-[18px]">error</span>
            <p className="text-sm font-medium text-[#C53030]">{error}</p>
          </div>
        )}

        <InputField
          label="Email"
          type="email"
          id="email"
          placeholder="nama@email.com"
          required
          autoComplete="email"
          error={errors.email?.message}
          leftIcon={<span className="material-symbols-outlined text-[22px]">mail</span>}
          {...register("email")}
        />

        <Button type="submit" size="lg" className="w-full" loading={isLoading}>
          Lanjut
        </Button>
      </form>

      <AuthBackLink />
    </div>
  );
}
