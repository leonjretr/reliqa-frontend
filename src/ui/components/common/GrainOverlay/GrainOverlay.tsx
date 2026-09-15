import { cn } from "@/ui/utils";

type Props = {
  className?: string;
};

export const GrainOverlay = ({ className }: Props) => (
  <div
    className={cn(
      "grain-texture pointer-events-none absolute inset-0 opacity-5.5 mix-blend-multiply",
      className,
    )}
  />
);
