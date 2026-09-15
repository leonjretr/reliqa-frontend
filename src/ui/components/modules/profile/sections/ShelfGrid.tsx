import { useTranslations } from "next-intl";

import { META_SEPARATOR, STOCK, thingPath } from "@/config";
import { Link } from "@/i18n";
import type { APIObjectListItem } from "@/service/types";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { formatYear } from "@/ui/utils";

const CARD_TILT_DEG = 2;

type Props = {
  objects: APIObjectListItem[];
};

export const ShelfGrid = ({ objects }: Props) => {
  const t = useTranslations("Profile");
  const common = useTranslations("Common");

  return (
    <>
      <MonoLabel className="mb-3.5">
        {t("TITLE_SHELF")}
        {META_SEPARATOR}
        {common("THINGS_COUNT", { count: objects.length })}
      </MonoLabel>
      <div className="grid grid-cols-2 gap-3.5">
        {objects.map((object, index) => {
          const stock = STOCK[index % STOCK.length];
          return (
            <Link
              key={object.id}
              href={thingPath(object.id)}
              className="border-ink rounded-paper shadow-card border px-3 pt-2.75 pb-3 no-underline"
              style={{
                background: stock.bg,
                color: stock.fg,
                transform: `rotate(${index % 2 ? CARD_TILT_DEG : -CARD_TILT_DEG}deg)`,
              }}
            >
              <MonoLabel className="text-micro mb-1.25 text-inherit opacity-72">
                {object.categories[0] ?? ""}
                {META_SEPARATOR}
                {formatYear(object.created_at)}
              </MonoLabel>
              <div className="text-copy-lg leading-card-lg font-semibold">{object.name}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
