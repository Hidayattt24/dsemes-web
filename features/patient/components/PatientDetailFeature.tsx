"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePatientDetail } from "../hooks/usePatientDetail";
import { PatientProfileCard } from "./PatientProfileCard";
import { PatientPersonalInfoCard } from "./PatientPersonalInfoCard";
import { PatientBloodSugarChart } from "./PatientBloodSugarChart";
import { PatientCalorieChart } from "./PatientCalorieChart";
import { PatientEducationActivity } from "./PatientEducationActivity";
import { ErrorState } from "@/components/common/ErrorState";
import Link from "next/link";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useToast } from "@/components/ui/Toast";

import { DetailPageLoader } from "@/components/ui/loading";

interface PatientDetailFeatureProps {
  readonly patientId: string;
}

export function PatientDetailFeature({ patientId }: PatientDetailFeatureProps) {
  const router = useRouter();
  const { patient, isLoading, error, refetch } = usePatientDetail(patientId);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    // Simulate delete API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsDeleting(false);
    setIsDeleteOpen(false);
    showToast({
      type: "success",
      title: "Berhasil",
      description: "Data pasien berhasil dihapus.",
    });
    router.push("/admin/data-pasien");
  };

  if (isLoading) {
    return <DetailPageLoader type="patient" />;
  }

  if (error || !patient) {
    return <ErrorState message={error ?? "Pasien tidak ditemukan."} onRetry={refetch} />;
  }

  return (
    <section className="space-y-8 max-w-[1600px] mx-auto w-full p-1">
      {/* Back link and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/data-pasien"
            className="flex items-center gap-2 text-[#718096] hover:text-[#00695C] transition-colors font-medium text-sm font-[family-name:var(--font-poppins)]"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>Monitoring Pasien</span>
          </Link>
          <span className="text-[#718096]/40 text-sm">/</span>
          <span className="font-semibold text-sm text-[#1A202C] font-[family-name:var(--font-poppins)]">
            Detail Pasien
          </span>
        </div>


      </div>

      {/* Profile summary bento cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <PatientProfileCard patient={patient} />
        </div>
        <div className="lg:col-span-8">
          <PatientPersonalInfoCard patient={patient} />
        </div>
      </div>

      {/* Metrics & Analytics section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <PatientBloodSugarChart />
        </div>
        <div className="lg:col-span-7">
          <PatientCalorieChart />
        </div>
        <div className="lg:col-span-5">
          <PatientEducationActivity />
        </div>
      </div>

    </section>
  );
}
