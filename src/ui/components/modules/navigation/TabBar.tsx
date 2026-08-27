"use client";

import type { ReactNode } from "react";

import { Link, usePathname } from "@/i18n";

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
    <nav
      style={{
        flex: "none",
        display: "flex",
        alignItems: "stretch",
        borderTop: "var(--key)",
        background: "var(--chalk)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.match(pathname);
        if (tab.center) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "8px 0 9px",
                textDecoration: "none",
                color: "var(--chalk)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  background: isActive ? "var(--oxblood)" : "var(--ink)",
                  color: "var(--chalk)",
                  border: "var(--key)",
                  borderColor: isActive ? "var(--oxblood)" : "var(--ink)",
                }}
              >
                {tab.icon}
              </span>
              <span className="sc" style={{ fontSize: 8, color: "var(--ink-soft)" }}>
                {tab.label}
              </span>
            </Link>
          );
        }
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: "9px 0 10px",
              textDecoration: "none",
              color: isActive ? "var(--ink)" : "var(--ink-faint)",
            }}
          >
            {tab.icon}
            <span
              className="sc"
              style={{ fontSize: 8, color: isActive ? "var(--oxblood)" : "var(--ink-faint)" }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
