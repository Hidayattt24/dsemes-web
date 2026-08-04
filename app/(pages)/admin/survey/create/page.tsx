import { SurveyFormFeature } from "@/features/survey/components/SurveyFormFeature";

export const metadata = {
  title: "Buat Survey Baru | DSMES Admin",
  description: "Buat instrumen survey penelitian baru",
};

export default function AdminSurveyCreatePage() {
  return <SurveyFormFeature />;
}
