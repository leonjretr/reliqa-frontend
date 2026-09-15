import type { ReactNode } from "react";

import { cn } from "@/ui/utils";

export const monoLabelClassName =
  "text-ink-faint font-kept-mono text-eyebrow tracking-widest uppercase";

type Props = {
  as?: "div" | "span";
  htmlFor?: string;
  className?: string;
  children?: ReactNode;
};

export const MonoLabel = ({ as: Element = "div", htmlFor, className, children }: Props) => {
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={cn(monoLabelClassName, "block", className)}>
        {children}
      </label>
    );
  }

  return <Element className={cn(monoLabelClassName, className)}>{children}</Element>;
};
