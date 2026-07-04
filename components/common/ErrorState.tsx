import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  readonly message?:  string;
  readonly onRetry?:  () => void;
}

export function ErrorState({
  message = "Terjadi kesalahan. Silakan coba lagi.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#FFF5F5] flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px] text-[#C53030]">
          error
        </span>
      </div>
      <div>
        <p className="font-semibold text-[#1A202C] text-sm">{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Coba Lagi
        </Button>
      )}
    </div>
  );
}
