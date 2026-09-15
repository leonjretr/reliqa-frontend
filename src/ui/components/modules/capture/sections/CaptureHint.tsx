import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CaptureHint = ({ children }: Props) => (
  <p className="text-ink-3 font-kept-mono text-caption leading-note mt-2">{children}</p>
);
