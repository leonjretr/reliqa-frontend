import type { ComponentProps } from "react";

import { cn } from "@/ui/utils";

type Props = ComponentProps<"div">;

export const StatGrid = ({ className, ...props }: Props) => (
  <div className={cn("bg-ink border-ink grid grid-cols-3 gap-px border", className)} {...props} />
);
