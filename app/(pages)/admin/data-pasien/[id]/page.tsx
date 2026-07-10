import type { Metadata } from "next";
import { PatientDetailFeature } from "@/features/patient/components/PatientDetailFeature";

export const metadata: Metadata = {
  title: "Detail Pasien | Digital DSMES Admin",
  description: "Detail profil dan data keanggotaan pasien DSMES.",
};

interface PatientDetailPageProps {
  readonly params: Promise<{ readonly id: string }>;
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = await params;
  return <PatientDetailFeature patientId={id} />;
}
