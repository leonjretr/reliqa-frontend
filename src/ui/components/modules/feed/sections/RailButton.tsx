import type { ReactNode } from "react";

import { Link } from "@/i18n";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { cn } from "@/ui/utils";

type Props = {
  href: string;
  glyph: ReactNode;
  label: string;
  filled?: boolean;
};

export const RailButton = ({ href, glyph, label, filled }: Props) => (
  <Link href={href} className="text-chalk flex flex-col items-center gap-1.25 no-underline">
    <span
      className={cn(
        "text-chalk backdrop-blur-veil flex h-11 w-11 items-center justify-center rounded-full border",
        filled ? "bg-oxblood border-oxblood" : "border-chalk/50 bg-night/35",
      )}
    >
      {glyph}
    </span>
    <MonoLabel as="span" className="text-chalk/72 text-micro">
      {label}
    </MonoLabel>
  </Link>
);
