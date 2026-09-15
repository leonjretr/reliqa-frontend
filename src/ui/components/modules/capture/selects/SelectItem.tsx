import type { ComponentProps } from "react";

import { ComboboxItem } from "@/ui/components/lib/shadcn";
import { cn } from "@/ui/utils";

import { SELECT_TEXT_CLASS_NAME } from "./styles";

type Props = ComponentProps<typeof ComboboxItem>;

export const SelectItem = ({ className, ...props }: Props) => (
  <ComboboxItem
    className={cn(
      "text-ink-2 data-highlighted:bg-ink data-highlighted:text-chalk rounded-none",
      SELECT_TEXT_CLASS_NAME,
      className,
    )}
    {...props}
  />
);
