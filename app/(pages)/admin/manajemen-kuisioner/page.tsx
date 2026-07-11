import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { TableLoader } from "@/components/ui/loading";

const QuizListFeature = dynamic(
  () => import("@/features/quiz/components/QuizListFeature").then((mod) => mod.QuizListFeature),
  {
    loading: () => <TableLoader />,
  }
);

export const metadata: Metadata = {
  title: "Manajemen Kuesioner | Digital DSMES Admin",
  description: "Kelola kuesioner edukasi dan pantau progres belajar pasien DSMES.",
};

export default function ManajemenKuisionerPage() {
  return <QuizListFeature />;
}
