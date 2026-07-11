import type { Metadata } from "next";
import { AdministratorFormFeature } from "@/features/administrator/components/AdministratorFormFeature";

export const metadata: Metadata = {
  title: "Edit Staff Monitoring | Digital DSMES Admin",
  description: "Edit data akun staff monitoring.",
};

interface EditAdministratorPageProps {
  readonly params: Promise<{ readonly id: string }>;
}

export default async function EditAdministratorPage({ params }: EditAdministratorPageProps) {
  const { id } = await params;
  return <AdministratorFormFeature adminId={id} />;
}
