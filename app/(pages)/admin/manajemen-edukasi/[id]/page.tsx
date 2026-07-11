import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { DetailPageLoader } from "@/components/ui/loading";

const EducationDetailFeature = dynamic(
  () => import("@/features/education/components/EducationDetailFeature").then((mod) => mod.EducationDetailFeature),
  {
    loading: () => <DetailPageLoader type="education" />,
  }
);

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
