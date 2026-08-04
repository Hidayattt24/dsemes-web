import { SurveyListFeature } from "@/features/survey/components/SurveyListFeature";

export const metadata = {
  title: "Manajemen Survey | DSMES Admin",
  description: "Kelola instrumen survey Kepuasan Pengguna dan System Usability Scale (SUS)",
};

export default function AdminSurveyPage() {
  return <SurveyListFeature isStaff={false} />;
}
