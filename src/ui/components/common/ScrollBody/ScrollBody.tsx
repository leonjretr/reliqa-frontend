import type { ComponentProps } from "react";

import { cn } from "@/ui/utils";

type Props = ComponentProps<"div">;

export const ScrollBody = ({ className, ...props }: Props) => (
  <div
    className={cn("kept-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain", className)}
    {...props}
  />
);
