import { PAGES, STOCK, thingPath } from "@/config";
import { Link } from "@/i18n";
import type { APICategoryDetail, APIObjectListItem } from "@/service/types";
import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { ScreenHeader } from "@/ui/components/modules/navigation";
import { cn, formatYear, groupThousands } from "@/ui/utils";

export type BrowseObject = APIObjectListItem & { stories_count: number };

const DECADES = [
  { label: "50s", count: 8 },
  { label: "60s", count: 17 },
  { label: "70s", count: 24 },
  { label: "80s", count: 31 },
  { label: "90s", count: 22 },
  { label: "00s", count: 26 },
  { label: "10s", count: 14 },
];

const DecadesBand = () => {
  const max = Math.max(...DECADES.map((decade) => decade.count));
  return (
    <div className="border-ink bg-ink flex gap-px border">
      {DECADES.map((decade) => {
        const isPeak = decade.count === max;
        const bars = Math.round((decade.count / max) * 7) || 1;
        return (
          <div
            key={decade.label}
            className="bg-chalk flex flex-1 flex-col items-center gap-1.25 pt-1.75 pb-1.5"
          >
            <div className="gap-bar-gap flex h-7.5 flex-col-reverse justify-start">
              {Array.from({ length: bars }).map((_, index) => (
                <div key={index} className={cn("h-bar w-4", isPeak ? "bg-oxblood" : "bg-ink-2")} />
              ))}
            </div>
            <span
              className={cn(
                "font-kept-mono text-micro tracking-widest uppercase",
                isPeak ? "text-oxblood" : "text-ink-faint",
              )}
            >
              {decade.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

type BrowseScreenProps = {
  objects: BrowseObject[];
  totalCount: number;
  category?: APICategoryDetail;
};

export const BrowseScreen = ({ objects, totalCount, category }: BrowseScreenProps) => {
  return (
    <div className="relative flex h-full flex-col">
      <ScreenHeader
        section={category?.name ?? "the catalogue"}
        right={`${totalCount} things`}
        back={category ? { href: PAGES.SEARCH, label: "categories" } : undefined}
      />
      <div className="kept-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="px-4.5 pt-4 pb-1.5">
          <h1 className="text-heading leading-headline tracking-heading font-bold">
            {category?.name ?? "Things people kept"}
          </h1>
          <div className="text-ink-faint font-kept-mono text-eyebrow mt-1.75 tracking-widest uppercase">
            {groupThousands(totalCount)} {totalCount === 1 ? "thing" : "things"} kept so far
          </div>
        </div>
        <div className="flex flex-col gap-4.5 px-4.5 pt-3 pb-5.5">
          {objects.map((object, objectIndex) => {
            const layers = Math.min(4, Math.round(object.stories_count / 24) + 1);
            return (
              <Link
                key={object.id}
                href={thingPath(object.id)}
                className="relative pb-6.5 text-inherit no-underline"
              >
                {Array.from({ length: layers }).map((_, layer) => (
                  <div
                    key={layer}
                    className="border-ink rounded-paper absolute h-3 border"
                    style={{
                      left: 7 + layer * 5,
                      right: 7 + layer * 5,
                      bottom: 26 - (layer + 1) * 6,
                      background: STOCK[(objectIndex + layer) % STOCK.length].bg,
                    }}
                  />
                ))}
                <div className="bg-chalk border-ink rounded-paper relative flex items-center gap-3.25 border p-2.75">
                  <KeptPhoto
                    category={object.categories[0]}
                    src={object.attachments[0]?.file.src}
                    alt={object.name}
                    className="border-ink h-19 w-19 flex-none border"
                  />
                  <div className="flex-1">
                    <div className="text-ink-faint font-kept-mono text-micro mb-1 tracking-widest uppercase">
                      {object.categories[0] ?? ""} · {formatYear(object.created_at)}
                    </div>
                    <div className="text-title tracking-snug leading-none font-bold">
                      {object.name}
                    </div>
                    <div className="text-oxblood text-detail mt-1.5 font-semibold">
                      {object.stories_count} kept one
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {objects.length === 0 && (
            <div className="border-hair rounded-paper border border-dashed px-4 py-6.5 text-center">
              <p className="text-ink-3 text-copy leading-normal font-light">
                {category
                  ? `Nothing kept in ${category.name.toLowerCase()} yet.`
                  : "Nothing kept yet."}
              </p>
            </div>
          )}
          <div>
            <div className="text-ink-faint font-kept-mono text-eyebrow mb-2 tracking-widest uppercase">
              when the memories happened
            </div>
            <DecadesBand />
          </div>
        </div>
      </div>
      <GrainOverlay />
    </div>
  );
};
