import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { DetailPageLoader } from "@/components/ui/loading";

const EducationProgressFeature = dynamic(
  () => import("@/features/education/components/EducationProgressFeature").then((mod) => mod.EducationProgressFeature),
  {
    loading: () => <DetailPageLoader type="education" />,
  }
);

export const metadata: Metadata = {
  title: "Progress Edukasi | Digital DSMES Admin",
  description: "Pantau progress belajar peserta pada materi edukasi.",
};

interface EducationProgressPageProps {
  readonly params: Promise<{ readonly id: string }>;
}

export default async function EducationProgressPage({ params }: EducationProgressPageProps) {
  const { id } = await params;
  return <EducationProgressFeature articleId={id} />;
}
