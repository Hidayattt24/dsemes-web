import type { Metadata } from "next";
import { AuthCard }      from "@/components/auth/AuthCard";
import { AuthHeroPanel } from "@/components/auth/AuthHeroPanel";
import { LoginForm }     from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Masuk | Digital DSMES",
  description: "Masuk ke sistem Digital DSMES untuk mengelola data pasien dan edukasi diabetes.",
};

export default function LoginPage() {
  return (
    <>
      <AuthCard>
        <LoginForm />
      </AuthCard>
      <AuthHeroPanel />
    </>
  );
}
