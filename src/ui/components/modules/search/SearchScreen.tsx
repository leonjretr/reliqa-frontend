import { Link } from "@/i18n";
import type { APICategoryListItem } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";

type SearchScreenProps = {
  categories: APICategoryListItem[];
};

const thingsLabel = (count: number) => `${count} thing${count === 1 ? "" : "s"}`;

export const SearchScreen = ({ categories }: SearchScreenProps) => {
  return (
    <div className="cork-texture flex h-full flex-col">
      <div className="px-[18px] pt-[18px] pb-[4px]">
        <div className="text-chalk/75 font-kept-mono mb-[8px] text-[9px] tracking-[0.1em] uppercase">
          find something kept
        </div>
        <div className="bg-chalk border-ink flex items-center gap-[8px] rounded-[3px] border px-[13px] py-[11px] shadow-[0_6px_14px_-8px_rgba(31,26,21,0.4)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink-faint"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <span className="text-ink-soft text-[15px] font-light italic">
            a camera, a radio, a chair…
          </span>
        </div>
      </div>
      <div className="kept-scroll grid min-h-0 flex-1 [scrollbar-gutter:stable] grid-cols-2 content-start gap-x-[16px] gap-y-[28px] overflow-y-auto overscroll-contain px-[16px] pt-[22px] pb-[24px]">
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            href={{ pathname: "/browse", query: { category: category.slug } }}
            className="border-ink text-ink bg-chalk relative block rounded-[2px] border p-[7px] pb-[11px] no-underline shadow-[0_12px_20px_-9px_rgba(0,0,0,0.45)]"
            style={{ transform: `rotate(${(index % 3) - 1}deg)` }}
          >
            <div className="fiber-texture pointer-events-none absolute inset-0 opacity-40" />
            <div className="absolute top-[-6px] left-1/2 z-[2] ml-[-6px] h-[12px] w-[12px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#f4b4a8,#b8402a_70%)] shadow-[0_2px_4px_rgba(0,0,0,0.45)]" />
            <div className="border-ink relative aspect-[4/3] w-full overflow-hidden border">
              <KeptPhoto
                category={category.name.toLowerCase()}
                src={category.cover?.src}
                alt={category.name}
                className="absolute inset-0"
              />
            </div>
            <div className="relative mt-[9px] flex items-baseline justify-between gap-[6px]">
              <span className="text-[16px] font-bold capitalize">{category.name}</span>
              <span className="text-ink-faint font-kept-mono flex-none text-[8px] tracking-[0.1em] uppercase lining-nums tabular-nums">
                {thingsLabel(category.objects_count)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
