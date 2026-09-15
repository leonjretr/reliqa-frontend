import { useTranslations } from "next-intl";

import { PAGES } from "@/config";
import { Link } from "@/i18n";
import { EmptyState } from "@/ui/components/common/EmptyState";
import { monoLabelClassName } from "@/ui/components/common/MonoLabel";
import { cn, getFirstName } from "@/ui/utils";

type Props = {
  keeperName: string;
  isOwn: boolean;
};

export const EmptyShelf = ({ keeperName, isOwn }: Props) => {
  const t = useTranslations("Profile");
  const message = isOwn
    ? t("EMPTY_OWN_SHELF")
    : t("EMPTY_SHELF", { name: getFirstName(keeperName) });

  return (
    <EmptyState message={message} className="mt-2">
      {isOwn && (
        <Link
          href={PAGES.ADD}
          className={cn(monoLabelClassName, "text-oxblood mt-2.5 inline-block no-underline")}
        >
          {t("LINK_KEEP")}
        </Link>
      )}
    </EmptyState>
  );
};
