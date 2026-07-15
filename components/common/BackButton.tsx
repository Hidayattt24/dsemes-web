import Link from "next/link";

interface BackButtonProps {
  readonly href: string;
  readonly label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-[#718096] hover:text-[#00695C] transition-colors font-medium text-sm font-[family-name:var(--font-poppins)]"
    >
      <span className="material-symbols-outlined text-[20px]">arrow_back</span>
      <span>{label}</span>
    </Link>
  );
}
