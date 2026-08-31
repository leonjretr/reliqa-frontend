"use client";

import type { ReactNode } from "react";

import { Link, usePathname } from "@/i18n";
import { cn } from "@/ui/utils/shadcn";

type Tab = {
  href: string;
  label: string;
  icon: ReactNode;
  match: (pathname: string) => boolean;
  center?: boolean;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const HouseIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);

const GridIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <rect x="3.5" y="3.5" width="7" height="7" />
    <rect x="13.5" y="3.5" width="7" height="7" />
    <rect x="3.5" y="13.5" width="7" height="7" />
    <rect x="13.5" y="13.5" width="7" height="7" />
  </svg>
);

const PlusIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SearchIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const UserIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);

const TABS: Tab[] = [
  { href: "/", label: "feed", icon: HouseIcon, match: (path) => path === "/" },
  {
    href: "/browse",
    label: "browse",
    icon: GridIcon,
    match: (path) => path.startsWith("/browse") || path.startsWith("/thing"),
  },
  {
    href: "/add",
    label: "keep",
    icon: PlusIcon,
    match: (path) => path.startsWith("/add"),
    center: true,
  },
  { href: "/search", label: "find", icon: SearchIcon, match: (path) => path.startsWith("/search") },
  {
    href: "/keeper/marta-ilves",
    label: "shelf",
    icon: UserIcon,
    match: (path) => path.startsWith("/keeper") || path.startsWith("/story"),
  },
];

export const TabBar = () => {
  const pathname = usePathname();

  return (
    <nav className="border-ink bg-chalk flex flex-none items-stretch border-t">
      {TABS.map((tab) => {
        const isActive = tab.match(pathname);
        if (tab.center) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="text-chalk flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-[9px] no-underline"
            >
              <span
                className={cn(
                  "text-chalk flex h-[34px] w-[34px] items-center justify-center border",
                  isActive ? "bg-oxblood border-oxblood" : "bg-ink border-ink",
                )}
              >
                {tab.icon}
              </span>
              <span className="text-ink-soft font-kept-mono text-[8px] tracking-[0.1em] uppercase">
                {tab.label}
              </span>
            </Link>
          );
        }
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-[5px] pt-[9px] pb-[10px] no-underline",
              isActive ? "text-ink" : "text-ink-faint",
            )}
          >
            {tab.icon}
            <span
              className={cn(
                "font-kept-mono text-[8px] tracking-[0.1em] uppercase",
                isActive ? "text-oxblood" : "text-ink-faint",
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
