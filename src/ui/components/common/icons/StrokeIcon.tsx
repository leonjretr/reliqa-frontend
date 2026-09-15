import type { ComponentProps } from "react";

import { cn } from "@/ui/utils";

type Props = ComponentProps<"svg">;

export const StrokeIcon = ({ className, children, ...props }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className={cn("size-6", className)}
    {...props}
  >
    {children}
  </svg>
);
