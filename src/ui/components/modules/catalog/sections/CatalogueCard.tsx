import { IMAGE_SIZES, META_SEPARATOR, STOCK, thingPath } from "@/config";
import { Link } from "@/i18n";
import type { APIObjectListItem } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { formatYear } from "@/ui/utils";

const LAYER_INSET_PX = 7;
const LAYER_BOTTOM_PX = 20;

type Props = {
  object: APIObjectListItem;
  index: number;
};

export const CatalogueCard = ({ object, index }: Props) => {
  const category = object.categories[0] ?? "";

  return (
    <Link href={thingPath(object.id)} className="relative pb-6.5 text-inherit no-underline">
      <div
        className="border-ink rounded-paper absolute h-3 border"
        style={{
          left: LAYER_INSET_PX,
          right: LAYER_INSET_PX,
          bottom: LAYER_BOTTOM_PX,
          background: STOCK[index % STOCK.length].bg,
        }}
      />
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
        </div>
      </div>
    </Link>
  );
};
