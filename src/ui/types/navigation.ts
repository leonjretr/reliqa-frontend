import type { ReactNode } from "react";

export type Tab = {
  href: string;
  label: string;
  icon: ReactNode;
  isActive: boolean;
  center?: boolean;
};
