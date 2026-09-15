import type { ComponentProps } from "react";

import { cn } from "@/ui/utils";

type Props = ComponentProps<"textarea">;

export const KeptTextarea = ({ className, ...props }: Props) => (
  <textarea
    className={cn(
      "text-ink placeholder:text-ink-faint bg-stock border-ink text-reading w-full resize-none border px-3 py-2.75 leading-normal font-light outline-none placeholder:italic focus:bg-white",
      className,
    )}
    {...props}
  />
);
