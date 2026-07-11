import type { Metadata } from "next";
import { AdministratorFormFeature } from "@/features/administrator/components/AdministratorFormFeature";

export const metadata: Metadata = {
  title: "Tambah Staff Monitoring | Digital DSMES Admin",
  description: "Tambah akun staff monitoring baru.",
};

export default function CreateAdministratorPage() {
  return <AdministratorFormFeature />;
}
