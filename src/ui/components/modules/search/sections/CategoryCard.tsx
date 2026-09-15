import { useTranslations } from "next-intl";

import { PAGES, QUERIES } from "@/config";
import { Link } from "@/i18n";
import type { APICategoryListItem } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { MonoLabel } from "@/ui/components/common/MonoLabel";

const CARD_TILTS_DEG = [-1, 0, 1];

type Props = {
  category: APICategoryListItem;
  index: number;
};

export const CategoryCard = ({ category, index }: Props) => {
  const common = useTranslations("Common");
  const tilt = CARD_TILTS_DEG[index % CARD_TILTS_DEG.length];

  return (
    <Link
      href={{ pathname: PAGES.BROWSE, query: { [QUERIES.CATEGORY]: category.slug } }}
      className="border-ink text-ink bg-chalk shadow-print relative block rounded-xs border p-1.75 pb-2.75 no-underline"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="fiber-texture pointer-events-none absolute inset-0 opacity-40" />
      <div className="border-ink relative aspect-4/3 w-full overflow-hidden border">
        <KeptPhoto
          category={category.name.toLowerCase()}
          src={category.cover?.src}
          alt={category.name}
          className="absolute inset-0"
        />
      </div>
      <div className="relative mt-2.25 flex items-baseline justify-between gap-1.5">
        <span className="text-copy-lg font-bold capitalize">{category.name}</span>
        <MonoLabel as="span" className="text-micro flex-none lining-nums tabular-nums">
          {common("THINGS_COUNT", { count: category.objects_count })}
        </MonoLabel>
      </div>
      <div className="pin-head shadow-pin absolute -top-1.5 left-1/2 -ml-1.5 h-3 w-3 rounded-full" />
    </Link>
  );
};
