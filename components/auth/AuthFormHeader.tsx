/**
 * AuthFormHeader — Reusable title + description block for all auth form pages.
 * Extracted from LoginForm to avoid duplicated JSX across 4 auth pages.
 */

interface AuthFormHeaderProps {
  readonly title:       string;
  readonly description: string;
}

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <div className="mb-8 font-[family-name:var(--font-jakarta)]">
      <h1 className="text-2xl font-bold text-[#1b1c1c] mb-2">{title}</h1>
      <p className="text-base text-[#3e4946] leading-relaxed">{description}</p>
    </div>
  );
}
