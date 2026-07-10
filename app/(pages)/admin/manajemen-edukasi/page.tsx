import type { Metadata } from "next";
import { EducationListFeature } from "@/features/education/components/EducationListFeature";

export const metadata: Metadata = {
  title: "Manajemen Edukasi | Digital DSMES Admin",
  description: "Kelola artikel dan materi edukasi pasien.",
};

export default function EducationListPage() {
  return <EducationListFeature />;
}
