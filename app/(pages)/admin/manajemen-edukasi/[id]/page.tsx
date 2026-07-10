import type { Metadata } from "next";
import { EducationDetailFeature } from "@/features/education/components/EducationDetailFeature";

export const metadata: Metadata = {
  title: "Detail Edukasi | Digital DSMES Admin",
  description: "Detail konten artikel edukasi dan statistik pembaca.",
};

interface EducationDetailPageProps {
  readonly params: Promise<{ readonly id: string }>;
}

export default async function EducationDetailPage({ params }: EducationDetailPageProps) {
  const { id } = await params;
  return <EducationDetailFeature articleId={id} />;
}
