import { useTranslations } from "next-intl";

import { APP_NAME } from "@/config";
import { Link } from "@/i18n";
import { MonoLabel } from "@/ui/components/common/MonoLabel";

type Props = {
  section: string;
  right?: string;
  back?: { href: string; label: string };
};

export const ScreenHeader = ({ section, right, back }: Props) => {
  const t = useTranslations("Navigation");

  return (
    <div className="bg-chalk flex-none px-4.5 pt-3.75 pb-2.25">
      <div className="flex items-baseline justify-between">
        {back ? (
          <Link href={back.href} className="no-underline">
            <MonoLabel as="span" className="text-oxblood">
              {t("LINK_BACK", { label: back.label })}
            </MonoLabel>
          </Link>
        ) : (
          <span className="text-copy tracking-brand font-bold">{APP_NAME}</span>
        )}
        <MonoLabel as="span">{section}</MonoLabel>
        <MonoLabel as="span" className="lining-nums tabular-nums">
          {right ?? ""}
        </MonoLabel>
      </div>
      <div className="bg-ink mt-2.25 h-px" />
    </div>
  );
};
