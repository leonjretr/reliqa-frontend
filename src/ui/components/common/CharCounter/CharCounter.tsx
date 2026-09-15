import { CHARACTERS_LOW_THRESHOLD } from "@/config";
import { cn } from "@/ui/utils";

type Props = {
  remaining: number;
};

export const CharCounter = ({ remaining }: Props) => (
  <span
    className={cn(
      "font-kept-mono text-meta lining-nums tabular-nums",
      remaining < CHARACTERS_LOW_THRESHOLD ? "text-oxblood" : "text-ink-faint",
    )}
  >
    {remaining}
  </span>
);
