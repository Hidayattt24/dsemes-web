import type { Metadata } from "next";
import { AuthCard }      from "@/components/auth/AuthCard";
import { AuthHeroPanel } from "@/components/auth/AuthHeroPanel";
import { VerifyCodeForm } from "@/features/auth/components/VerifyCodeForm";

export const metadata: Metadata = {
  title: "Verifikasi Kode | Digital DSMES",
  description: "Masukkan 6 digit kode verifikasi yang dikirim ke email Anda.",
};

export default function VerifikasiKodePage() {
  return (
    <>
      <AuthCard>
        <VerifyCodeForm />
      </AuthCard>
      <AuthHeroPanel />
    </>
  );
}
