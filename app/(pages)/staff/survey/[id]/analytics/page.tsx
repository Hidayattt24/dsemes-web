import { SurveyAnalyticsFeature } from "@/features/survey/components/SurveyAnalyticsFeature";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Analitik & Respons Survey | DSMES Staff",
  description: "Lihat analitik dan respons peserta survei",
};

export default async function StaffSurveyAnalyticsPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <SurveyAnalyticsFeature surveyId={resolvedParams.id} isStaff={true} />;
}
