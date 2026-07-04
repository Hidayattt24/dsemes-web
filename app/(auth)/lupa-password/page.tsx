import type { Metadata } from "next";
import { AuthCard }          from "@/components/auth/AuthCard";
import { AuthHeroPanel }     from "@/components/auth/AuthHeroPanel";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Lupa Kata Sandi | Digital DSMES",
  description: "Kirim kode verifikasi ke email Anda untuk mengatur ulang kata sandi.",
};

export default function LupaPasswordPage() {
  return (
    <>
      <AuthCard>
        <ForgotPasswordForm />
      </AuthCard>
      <AuthHeroPanel />
    </>
  );
}
