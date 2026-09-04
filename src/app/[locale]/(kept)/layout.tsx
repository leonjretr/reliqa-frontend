import type { ReactNode } from "react";
import { DM_Mono, Literata } from "next/font/google";

import { getCurrentUser } from "@/service";
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

const KeptLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  const profileSlug = user.success ? user.username : null;

  return (
    <div className={`${literata.variable} ${dmMono.variable} text-ink bg-desk font-kept min-h-svh`}>
      <div className="mx-auto flex min-h-svh w-full max-w-[420px] flex-col sm:justify-center sm:py-8">
        <div className="bg-chalk relative flex h-svh w-full flex-col overflow-hidden shadow-[0_22px_54px_-18px_rgba(40,31,22,0.45)] sm:h-[min(864px,calc(100svh-4rem))]">
          <main className="relative min-h-0 flex-1 overflow-hidden">{children}</main>
          <TabBar profileSlug={profileSlug} />
        </div>
      </div>
    </div>
  );
};

export default KeptLayout;
