import { cn } from "@/ui/utils";

type Props = {
  className?: string;
};

export const Divider = ({ className }: Props) => <div className={cn("bg-ink h-px", className)} />;
