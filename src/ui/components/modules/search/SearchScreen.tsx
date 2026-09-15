import { PAGES, QUERIES } from "@/config";
import { Link } from "@/i18n";
import type { APICategoryListItem } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";

import { CategorySearch } from "./CategorySearch";

type SearchScreenProps = {
  categories: APICategoryListItem[];
  query?: string;
};

const thingsLabel = (count: number) => `${count} thing${count === 1 ? "" : "s"}`;

export const SearchScreen = ({ categories, query }: SearchScreenProps) => {
  return (
    <div className="cork-texture flex h-full flex-col">
      <div className="px-4.5 pt-4.5 pb-1">
        <div className="text-chalk/75 font-kept-mono text-eyebrow mb-2 tracking-widest uppercase">
          find something kept
        </div>
        <CategorySearch />
      </div>
      {categories.length === 0 && query && (
        <p className="text-chalk/75 font-kept-mono text-meta px-4.5 pt-5.5 tracking-widest uppercase">
          Nothing kept under “{query}”.
        </p>
      )}
      <div className="kept-scroll grid min-h-0 flex-1 grid-cols-2 content-start gap-x-4 gap-y-7 overflow-y-auto overscroll-contain px-4 pt-5.5 pb-6">
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            href={{ pathname: PAGES.BROWSE, query: { [QUERIES.CATEGORY]: category.slug } }}
            className="border-ink text-ink bg-chalk shadow-print relative block rounded-xs border p-1.75 pb-2.75 no-underline"
            style={{ transform: `rotate(${(index % 3) - 1}deg)` }}
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
              <span className="text-ink-faint font-kept-mono text-micro flex-none tracking-widest uppercase lining-nums tabular-nums">
                {thingsLabel(category.objects_count)}
              </span>
            </div>
            <div className="pin-head shadow-pin absolute -top-1.5 left-1/2 -ml-1.5 h-3 w-3 rounded-full" />
          </Link>
        ))}
      </div>
    </div>
  );
};
