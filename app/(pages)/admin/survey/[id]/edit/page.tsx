import { SurveyFormFeature } from "@/features/survey/components/SurveyFormFeature";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Edit Survey | DSMES Admin",
  description: "Edit detail dan pertanyaan survei",
};

export default async function AdminSurveyEditPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <SurveyFormFeature surveyId={resolvedParams.id} />;
}
