import type { ReactNode } from "react";
import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";

import { cn } from "@/ui/utils/shadcn";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--next-font-newsreader",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--next-font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--next-font-plex-mono",
  display: "swap",
});

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={cn(
        newsreader.variable,
        archivo.variable,
        plexMono.variable,
        "auth-surface text-foreground bg-auth-ink-900 font-archivo min-h-svh",
      )}
    >
      {children}
    </div>
  );
};

export default LoginLayout;
