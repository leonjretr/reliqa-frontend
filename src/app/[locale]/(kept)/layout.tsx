import type { ReactNode } from "react";
import { DM_Mono, Literata } from "next/font/google";

import "@/ui/styles/kept.css";

import { TabBar } from "@/ui/components/modules/navigation";

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const KeptLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`${literata.variable} ${dmMono.variable} kept-root`}
      style={{ background: "var(--desk)", minHeight: "100svh" }}
    >
      <div className="mx-auto flex min-h-svh w-full max-w-[420px] flex-col sm:justify-center sm:py-8">
        <div className="kept-screen flex h-svh w-full flex-col sm:h-[min(864px,calc(100svh-4rem))]">
          <main className="relative min-h-0 flex-1 overflow-hidden">{children}</main>
          <TabBar />
        </div>
      </div>
    </div>
  );
};

export default KeptLayout;
