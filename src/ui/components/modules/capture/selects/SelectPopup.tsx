import type { ComponentProps } from "react";
import { useTranslations } from "next-intl";

import {
  ComboboxEmpty,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxStatus,
} from "@/ui/components/lib/shadcn";
import { cn } from "@/ui/utils";

import { SELECT_TEXT_CLASS_NAME } from "./styles";

type Props = {
  isPending: boolean;
  emptyLabel: string;
  children: ComponentProps<typeof ComboboxList>["children"];
};

export const SelectPopup = ({ isPending, emptyLabel, children }: Props) => {
  const t = useTranslations("Capture");

  return (
    <ComboboxPortal>
      <ComboboxPositioner>
        <ComboboxPopup
          aria-busy={isPending || undefined}
          className="border-ink bg-chalk font-kept-mono rounded-none shadow-none"
        >
          <ComboboxStatus className={cn("text-ink-faint", SELECT_TEXT_CLASS_NAME)}>
            {isPending ? t("STATUS_SEARCHING") : null}
          </ComboboxStatus>
          <ComboboxEmpty className={cn("text-ink-faint", SELECT_TEXT_CLASS_NAME)}>
            {emptyLabel}
          </ComboboxEmpty>
          <ComboboxList>{children}</ComboboxList>
        </ComboboxPopup>
      </ComboboxPositioner>
    </ComboboxPortal>
  );
};
