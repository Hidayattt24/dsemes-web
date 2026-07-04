interface EmptyStateProps {
  readonly title:    string;
  readonly message?: string;
  readonly icon?:    string;
}

export function EmptyState({
  title,
  message,
  icon = "inbox",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center py-8">
      <div className="w-14 h-14 rounded-2xl bg-[#F4F6F8] flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px] text-[#718096]">
          {icon}
        </span>
      </div>
      <div>
        <p className="font-semibold text-[#1A202C] text-sm">{title}</p>
        {message && (
          <p className="text-xs text-[#718096] mt-1">{message}</p>
        )}
      </div>
    </div>
  );
}
