import { useTranslations } from "next-intl";

import { IMAGE_SIZES, META_SEPARATOR, STOCK, thingPath } from "@/config";
import { Link } from "@/i18n";
import type { CatalogueObject } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { formatYear } from "@/ui/utils";

const MAX_LAYERS = 4;
const STORIES_PER_LAYER = 24;
const LAYER_INSET_PX = 7;
const LAYER_INSET_STEP_PX = 5;
const LAYER_BOTTOM_PX = 26;
const LAYER_BOTTOM_STEP_PX = 6;

const countLayers = (storiesCount: number) =>
  Math.min(MAX_LAYERS, Math.round(storiesCount / STORIES_PER_LAYER) + 1);

type Props = {
  object: CatalogueObject;
  index: number;
};

export const CatalogueCard = ({ object, index }: Props) => {
  const t = useTranslations("Catalogue");
  const category = object.categories[0] ?? "";

  return (
    <Link href={thingPath(object.id)} className="relative pb-6.5 text-inherit no-underline">
      {Array.from({ length: countLayers(object.stories_count) }, (_layer, layer) => (
        <div
          key={layer}
          className="border-ink rounded-paper absolute h-3 border"
          style={{
            left: LAYER_INSET_PX + layer * LAYER_INSET_STEP_PX,
            right: LAYER_INSET_PX + layer * LAYER_INSET_STEP_PX,
            bottom: LAYER_BOTTOM_PX - (layer + 1) * LAYER_BOTTOM_STEP_PX,
            background: STOCK[(index + layer) % STOCK.length].bg,
          }}
        />
      ))}
      <div className="bg-chalk border-ink rounded-paper relative flex items-center gap-3.25 border p-2.75">
        <KeptPhoto
          category={object.categories[0]}
          src={object.attachments[0]?.file.src}
          alt={object.name}
          sizes={IMAGE_SIZES.THUMBNAIL}
          className="border-ink h-19 w-19 flex-none border"
        />
        <div className="flex-1">
          <MonoLabel className="text-micro mb-1">
            {category}
            {META_SEPARATOR}
            {formatYear(object.created_at)}
          </MonoLabel>
          <div className="text-title tracking-snug leading-none font-bold">{object.name}</div>
          <div className="text-oxblood text-detail mt-1.5 font-semibold">
            {t("KEPT_BY_COUNT", { count: object.stories_count })}
          </div>
        </div>
      </div>
    </Link>
  );
};
