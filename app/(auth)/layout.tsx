import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbf9f8] p-0 md:p-6">
      <main
        className="w-full max-w-[1440px] min-h-[90vh] bg-white md:rounded-[32px] overflow-hidden flex flex-col md:flex-row"
        style={{ boxShadow: "0 8px 32px -4px rgba(0, 79, 69, 0.12)" }}
      >
        {children}
      </main>
    </div>
  );
}
