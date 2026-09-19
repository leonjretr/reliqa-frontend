import { DM_Mono, Literata } from "next/font/google";

import { getCurrentUser } from "@/service/api";
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

const Layout = async ({ children }: LayoutProps<"/[locale]">) => {
  const user = await getCurrentUser();
  const profileSlug = user.success ? user.username : null;

  return (
    <div className={`${literata.variable} ${dmMono.variable} text-ink bg-desk font-kept min-h-svh`}>
      <div className="max-w-phone mx-auto flex min-h-svh w-full flex-col sm:justify-center sm:py-8">
        <div
          data-app-frame
          className="bg-chalk shadow-phone sm:h-phone-frame relative flex h-svh w-full flex-col overflow-hidden"
        >
          <main className="relative min-h-0 flex-1 overflow-hidden">{children}</main>
          <TabBar profileSlug={profileSlug} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
