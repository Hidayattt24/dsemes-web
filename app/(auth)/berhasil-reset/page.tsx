import type { Metadata } from "next";
import { AuthCard }          from "@/components/auth/AuthCard";
import { AuthHeroPanel }     from "@/components/auth/AuthHeroPanel";
import { ResetSuccessView }  from "@/features/auth/components/ResetSuccessView";

export const metadata: Metadata = {
  title: "Kata Sandi Berhasil Diubah | Digital DSMES",
  description: "Kata sandi Anda telah berhasil diperbarui. Silakan masuk kembali.",
};

export default function BerhasilResetPage() {
  return (
    <>
      <AuthCard>
        <ResetSuccessView />
      </AuthCard>
      <AuthHeroPanel />
    </>
  );
}
