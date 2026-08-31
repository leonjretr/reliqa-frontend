import { Link } from "@/i18n";
import { STOCK, type Keeper } from "@/ui/components/modules/feed";

type ProfileScreenProps = {
  keeper: Keeper;
};

export const ProfileScreen = ({ keeper }: ProfileScreenProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="torn-edge bg-plum relative h-[172px] flex-none">
        <div className="grain-texture pointer-events-none absolute inset-0 z-40 opacity-[0.055] mix-blend-multiply" />
        <div className="absolute bottom-[26px] left-[20px] text-[#f6e9ee]">
          <div className="font-kept-mono mb-[6px] text-[9px] tracking-[0.1em] text-[rgba(246,233,238,0.75)] uppercase">
            keeper since {keeper.since} · {keeper.place}
          </div>
          <div className="text-[34px] font-bold">{keeper.name}</div>
        </div>
      </div>
      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain px-[18px] py-[22px]">
        <div className="text-ink-faint font-kept-mono mb-[14px] text-[9px] tracking-[0.1em] uppercase">
          {keeper.kept.length} things kept a memory on
        </div>
        <div className="grid grid-cols-2 gap-[14px]">
          {keeper.kept.map((item, index) => {
            const stock = STOCK[item.stock % STOCK.length];
            return (
              <Link
                key={item.objectSlug}
                href={`/thing/${item.objectSlug}`}
                className="border-ink rounded-[3px] border px-[12px] pt-[11px] pb-[12px] no-underline shadow-[0_6px_14px_-8px_rgba(31,26,21,0.4)]"
                style={{
                  background: stock.bg,
                  color: stock.fg,
                  transform: `rotate(${index % 2 ? 2 : -2}deg)`,
                }}
              >
                <div className="font-kept-mono mb-[5px] text-[8px] tracking-[0.1em] uppercase opacity-[0.72]">
                  {item.category} · {item.year}
                </div>
                <div className="text-[16px] leading-[1.15] font-semibold">{item.name}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
