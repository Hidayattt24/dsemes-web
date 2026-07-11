import type { Metadata } from "next";
import { AdministratorFeature } from "@/features/administrator/components/AdministratorFeature";

export const metadata: Metadata = {
  title: "Administrator | Digital DSMES Admin",
  description: "Kelola hak akses dan akun monitoring staff.",
};

export default function AdministratorPage() {
  return <AdministratorFeature />;
}
