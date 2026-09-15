"use client";

import { useSearchParams } from "next/navigation";

import { keeperPath, PAGES, QUERIES } from "@/config";
import { Link, usePathname } from "@/i18n";
import { GridIcon, HouseIcon, PlusIcon, SearchIcon, UserIcon } from "@/ui/components/common/icons";
import type { Tab } from "@/ui/types";
import { cn } from "@/ui/utils";

const buildTabs = (profileSlug: string | null, category: string | null): Tab[] => [
  {
    href: PAGES.FEED,
    label: "feed",
    icon: <HouseIcon className="size-4.5" />,
    match: (path) => path === PAGES.FEED,
  },
  {
    href: PAGES.BROWSE,
    label: "browse",
    icon: <GridIcon className="size-4.5" />,
    match: (path) => path.startsWith(PAGES.BROWSE) || path.startsWith(PAGES.THING),
  },
  {
    href: category ? `${PAGES.ADD}?${QUERIES.CATEGORY}=${encodeURIComponent(category)}` : PAGES.ADD,
    label: "keep",
    icon: <PlusIcon className="size-4.5" />,
    match: (path) => path.startsWith(PAGES.ADD),
    center: true,
  },
  {
    href: PAGES.SEARCH,
    label: "find",
    icon: <SearchIcon className="size-4.5" />,
    match: (path) => path.startsWith(PAGES.SEARCH),
  },
  {
    href: profileSlug ? keeperPath(profileSlug) : PAGES.LOGIN,
    label: "shelf",
    icon: <UserIcon className="size-4.5" />,
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
