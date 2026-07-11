import { DetailPatientSkeleton } from "./DetailPatientSkeleton";
import { DetailRecordSkeleton } from "./DetailRecordSkeleton";
import { DetailEducationSkeleton } from "./DetailEducationSkeleton";

interface DetailPageLoaderProps {
  readonly type?: "patient" | "record" | "education";
}

export function DetailPageLoader({ type = "patient" }: DetailPageLoaderProps) {
  switch (type) {
    case "record":
      return <DetailRecordSkeleton />;
    case "education":
      return <DetailEducationSkeleton />;
    case "patient":
    default:
      return <DetailPatientSkeleton />;
  }
}
