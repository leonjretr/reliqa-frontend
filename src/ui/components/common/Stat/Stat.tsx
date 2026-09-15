import type { ReactNode } from "react";

import { cn } from "@/ui/utils";

import { MonoLabel } from "../MonoLabel";

type Props = {
  label: string;
  value: ReactNode;
  className?: string;
  valueClassName?: string;
};

export const Stat = ({ label, value, className, valueClassName }: Props) => (
  <div className={cn("bg-chalk px-2.5 py-2.25", className)}>
    <MonoLabel className="text-micro mb-0.75">{label}</MonoLabel>
    <div
      className={cn(
        "font-kept-mono text-detail font-medium lining-nums tabular-nums",
        valueClassName,
      )}
    >
      {value}
    </div>
  </div>
);
