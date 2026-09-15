import type { ComponentProps } from "react";

import { cn } from "@/ui/utils";

export const monoLabelClassName =
  "text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase";

type Props = ComponentProps<"div"> & {
  as?: "div" | "span";
};

export const MonoLabel = ({ as: Element = "div", className, ...props }: Props) => (
  <Element className={cn(monoLabelClassName, className)} {...props} />
);
