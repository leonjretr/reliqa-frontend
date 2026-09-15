"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import { keeperPath, PAGES, QUERIES } from "@/config";
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

const buildTabs = (profileSlug: string | null, category: string | null): Tab[] => [
  { href: PAGES.FEED, label: "feed", icon: HouseIcon, match: (path) => path === PAGES.FEED },
  {
    href: PAGES.BROWSE,
    label: "browse",
    icon: GridIcon,
    match: (path) => path.startsWith(PAGES.BROWSE) || path.startsWith(PAGES.THING),
  },
  {
    href: category ? `${PAGES.ADD}?${QUERIES.CATEGORY}=${encodeURIComponent(category)}` : PAGES.ADD,
    label: "keep",
    icon: PlusIcon,
    match: (path) => path.startsWith(PAGES.ADD),
    center: true,
  },
  {
    href: PAGES.SEARCH,
    label: "find",
    icon: SearchIcon,
    match: (path) => path.startsWith(PAGES.SEARCH),
  },
  {
    href: profileSlug ? keeperPath(profileSlug) : PAGES.LOGIN,
    label: "shelf",
    icon: UserIcon,
    match: (path) => path.startsWith(PAGES.KEEPER) || path.startsWith(PAGES.STORY),
  },
];

export const TabBar = ({ profileSlug = null }: { profileSlug?: string | null }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = pathname.startsWith(PAGES.BROWSE) ? searchParams.get(QUERIES.CATEGORY) : null;
  const tabs = buildTabs(profileSlug, category);

  return (
    <nav className="border-ink bg-chalk flex flex-none items-stretch border-t">
      {tabs.map((tab) => {
        const isActive = tab.match(pathname);
        if (tab.center) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="text-chalk flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-2.25 no-underline"
            >
              <span
                className={cn(
                  "text-chalk flex h-8.5 w-8.5 items-center justify-center border",
                  isActive ? "bg-oxblood border-oxblood" : "bg-ink border-ink",
                )}
              >
                {tab.icon}
              </span>
              <span className="text-ink-soft font-kept-mono text-micro tracking-widest uppercase">
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
              "flex flex-1 flex-col items-center justify-center gap-1.25 pt-2.25 pb-2.5 no-underline",
              isActive ? "text-ink" : "text-ink-faint",
            )}
          >
            {tab.icon}
            <span
              className={cn(
                "font-kept-mono text-micro tracking-widest uppercase",
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
