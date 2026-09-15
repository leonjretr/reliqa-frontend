import type { ReactNode } from "react";

import { cn } from "@/ui/utils";

type Props = {
  message: string;
  children?: ReactNode;
  className?: string;
};

export const EmptyState = ({ message, children, className }: Props) => (
  <div
    className={cn(
      "border-hair rounded-paper border border-dashed px-4 py-6.5 text-center",
      className,
    )}
  >
    <p className="text-ink-3 text-copy leading-normal font-light">{message}</p>
    {children}
  </div>
);
