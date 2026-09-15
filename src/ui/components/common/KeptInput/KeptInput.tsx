import type { ComponentProps } from "react";

import { cn } from "@/ui/utils";

type Props = ComponentProps<"input">;

export const KeptInput = ({ className, ...props }: Props) => (
  <input
    className={cn(
      "text-ink placeholder:text-ink-faint border-ink text-field w-full border-0 border-b bg-transparent pt-1.75 pb-1.5 outline-none placeholder:font-light placeholder:italic",
      className,
    )}
    {...props}
  />
);
