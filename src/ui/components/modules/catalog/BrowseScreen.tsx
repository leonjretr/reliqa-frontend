import { Link } from "@/i18n";
import type { APICategoryDetail, APIObjectListItem } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { groupThousands, STOCK } from "@/ui/components/modules/feed";
import { ScreenHeader } from "@/ui/components/modules/navigation";
import { cn } from "@/ui/utils/shadcn";

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

const yearOf = (isoDate: string) => String(new Date(isoDate).getFullYear());

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
            className="bg-chalk flex flex-1 flex-col items-center gap-[5px] pt-[7px] pb-[6px]"
          >
            <div className="flex h-[30px] flex-col-reverse justify-start gap-[1.5px]">
              {Array.from({ length: bars }).map((_, index) => (
                <div
                  key={index}
                  className={cn("h-[2.5px] w-[16px]", isPeak ? "bg-oxblood" : "bg-ink-2")}
                />
              ))}
            </div>
            <span
              className={cn(
                "font-kept-mono text-[8px] tracking-[0.1em] uppercase",
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
      <div className="grain-texture pointer-events-none absolute inset-0 z-40 opacity-[0.055] mix-blend-multiply" />
      <ScreenHeader
        section={category?.name ?? "the catalogue"}
        right={`${totalCount} things`}
        back={category ? { href: "/search", label: "categories" } : undefined}
      />
      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain">
        <div className="px-[18px] pt-[16px] pb-[6px]">
          <h1 className="text-[29px] leading-[1.05] font-bold tracking-[-0.028em]">
            {category?.name ?? "Things people kept"}
          </h1>
          <div className="text-ink-faint font-kept-mono mt-[7px] text-[9px] tracking-[0.1em] uppercase">
            {groupThousands(totalCount)} {totalCount === 1 ? "thing" : "things"} kept so far
          </div>
        </div>
        <div className="flex flex-col gap-[18px] px-[18px] pt-[12px] pb-[22px]">
          {objects.map((object, objectIndex) => {
            const layers = Math.min(4, Math.round(object.stories_count / 24) + 1);
            return (
              <Link
                key={object.id}
                href={`/thing/${object.id}`}
                className="relative pb-[26px] text-inherit no-underline"
              >
                {Array.from({ length: layers }).map((_, layer) => (
                  <div
                    key={layer}
                    className="border-ink absolute z-0 h-[12px] rounded-[3px] border"
                    style={{
                      left: 7 + layer * 5,
                      right: 7 + layer * 5,
                      bottom: 26 - (layer + 1) * 6,
                      background: STOCK[(objectIndex + layer) % STOCK.length].bg,
                    }}
                  />
                ))}
                <div className="bg-chalk border-ink relative z-[1] flex items-center gap-[13px] rounded-[3px] border p-[11px]">
                  <KeptPhoto
                    category={object.categories[0]}
                    src={object.attachments[0]?.file.src}
                    alt={object.name}
                    className="border-ink h-[76px] w-[76px] flex-none border"
                  />
                  <div className="flex-1">
                    <div className="text-ink-faint font-kept-mono mb-[4px] text-[8px] tracking-[0.1em] uppercase">
                      {object.categories[0] ?? ""} · {yearOf(object.created_at)}
                    </div>
                    <div className="text-[24px] leading-none font-bold tracking-[-0.02em]">
                      {object.name}
                    </div>
                    <div className="text-oxblood mt-[6px] text-[13px] font-semibold">
                      {object.stories_count} kept one
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {objects.length === 0 && (
            <div className="border-hair rounded-[3px] border border-dashed px-[16px] py-[26px] text-center">
              <p className="text-ink-3 text-[15px] leading-[1.5] font-light">
                {category
                  ? `Nothing kept in ${category.name.toLowerCase()} yet.`
                  : "Nothing kept yet."}
              </p>
            </div>
          )}
          <div>
            <div className="text-ink-faint font-kept-mono mb-[8px] text-[9px] tracking-[0.1em] uppercase">
              when the memories happened
            </div>
            <DecadesBand />
          </div>
        </div>
      </div>
    </div>
  );
};
