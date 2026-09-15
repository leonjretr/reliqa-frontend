import type { ReactNode } from "react";

export type Tab = {
  href: string;
  label: string;
  icon: ReactNode;
  match: (pathname: string) => boolean;
  center?: boolean;
};
