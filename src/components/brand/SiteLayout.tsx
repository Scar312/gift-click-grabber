import type { ReactNode } from "react";
import { SiteHeader } from "@/components/brand/SiteHeader";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-20">{children}</main>
    </div>
  );
}
