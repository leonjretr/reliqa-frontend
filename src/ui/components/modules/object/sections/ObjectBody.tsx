import { useTranslations } from "next-intl";

import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { cn } from "@/ui/utils";

type Props = {
  heading: string;
  year: string;
  paragraphs: string[];
};

export const ObjectBody = ({ heading, year, paragraphs }: Props) => {
  const t = useTranslations("Object");

  return (
    <>
      <div className="flex items-baseline gap-2.25">
        <MonoLabel as="span">{heading}</MonoLabel>
        <span className="bg-hair h-px flex-1 -translate-y-0.75" />
        <MonoLabel as="span" className="lining-nums tabular-nums">
          {t("LABEL_WRITTEN", { year })}
        </MonoLabel>
      </div>

      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={cn(
            "text-ink-2 text-field leading-reading font-light",
            index === 0 ? "mt-4" : "mt-3.5",
          )}
        >
          {paragraph}
        </p>
      ))}
    </>
  );
};
