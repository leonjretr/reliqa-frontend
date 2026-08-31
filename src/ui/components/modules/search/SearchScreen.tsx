import { Link } from "@/i18n";
import { CATEGORIES, STOCK } from "@/ui/components/modules/feed";

export const SearchScreen = () => {
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
      <div className="kept-scroll grid min-h-0 flex-1 [scrollbar-gutter:stable] grid-cols-2 content-start gap-x-[14px] gap-y-[26px] overflow-y-auto overscroll-contain px-[16px] pt-[20px] pb-[22px]">
        {CATEGORIES.map((category, index) => {
          const stock = STOCK[category.stock % STOCK.length];
          return (
            <Link
              key={category.slug}
              href="/browse"
              className="border-ink relative rounded-[2px] border px-[12px] pt-[30px] pb-[13px] no-underline shadow-[0_10px_18px_-8px_rgba(0,0,0,0.4)]"
              style={{
                background: stock.bg,
                color: stock.fg,
                transform: `rotate(${(index % 3) - 1}deg)`,
              }}
            >
              <div className="fiber-texture absolute inset-0 opacity-30 mix-blend-overlay" />
              <div className="absolute top-[-5px] left-1/2 ml-[-5.5px] h-[11px] w-[11px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#f4b4a8,#b8402a_70%)] shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
              <div className="mb-[5px] text-[18px] font-bold capitalize">{category.name}</div>
              <div className="font-kept-mono text-[8px] tracking-[0.1em] uppercase opacity-80">
                {category.count}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
