"use client";

import { useState } from "react";

import { Link } from "@/i18n";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { STOCK, type ObjectDetail as ObjectDetailData } from "@/ui/components/modules/feed";
import { ScreenHeader } from "@/ui/components/modules/navigation";

const POSITIONS: [number, number, number][] = [
  [14, 18, -6],
  [192, 58, 4],
  [30, 168, 3],
  [158, 212, -3],
  [62, 296, -2],
];

type ObjectDetailProps = {
  object: ObjectDetailData;
};

export const ObjectDetail = ({ object }: ObjectDetailProps) => {
  const [open, setOpen] = useState<number | null>(null);
  const labels = object.stuckOn.slice(0, 5);

  return (
    <div className="relative flex h-full flex-col">
      <div className="grain-texture pointer-events-none absolute inset-0 z-40 opacity-[0.055] mix-blend-multiply" />
      <ScreenHeader
        section={object.category}
        right={`${object.keepers} kept`}
        back={{ href: "/browse", label: "the catalogue" }}
      />
      <div className="kept-scroll min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain px-[18px] pt-[16px] pb-[24px]">
        <h1 className="mb-[7px] text-[46px] leading-[0.94] font-bold tracking-[-0.03em]">
          {object.name}
        </h1>
        <p className="text-ink-2 mb-[15px] max-w-[33ch] text-[18px] leading-[1.38] font-light italic">
          {object.blurb}
        </p>

        <div className="border-ink relative h-[398px] border">
          <KeptPhoto category={object.category} className="absolute inset-0" />
          {labels.map((label, index) => {
            const [x, y, rotate] = POSITIONS[index];
            const stock = STOCK[label.stock % STOCK.length];
            const isActive = open === index;
            return (
              <button
                key={label.keeperSlug + index}
                onClick={() => setOpen(isActive ? null : index)}
                className="border-ink absolute w-[174px] cursor-pointer rounded-[3px] border px-[12px] pt-[10px] pb-[11px] text-left transition-[transform,box-shadow] duration-[340ms] ease-[cubic-bezier(0.2,0.9,0.2,1)]"
                style={{
                  left: x,
                  top: y,
                  background: stock.bg,
                  color: stock.fg,
                  transform: `rotate(${rotate}deg) translateY(${isActive ? -16 : 0}px) scale(${isActive ? 1.04 : 1})`,
                  boxShadow: isActive
                    ? "0 16px 26px -10px rgba(31,26,21,.5)"
                    : "0 2.5px 0 rgba(31,26,21,.2)",
                  zIndex: isActive ? 9 : index + 1,
                }}
              >
                <div className="mb-[3px] flex items-baseline justify-between opacity-[0.76]">
                  <span className="font-kept-mono text-[8.5px] tracking-[0.1em] uppercase">
                    {label.place}
                  </span>
                  <span className="font-kept-mono text-[8.5px] tracking-[0.1em] uppercase lining-nums tabular-nums">
                    {label.year}
                  </span>
                </div>
                <div className="text-[16px] leading-[1.12] font-semibold">{label.name}</div>
                {isActive && (
                  <>
                    <p className="mt-[8px] text-[13.5px] leading-[1.42] font-light">{label.text}</p>
                    <Link
                      href={`/keeper/${label.keeperSlug}`}
                      className="font-kept-mono mt-[8px] inline-block text-[9px] tracking-[0.1em] uppercase"
                    >
                      their shelf →
                    </Link>
                  </>
                )}
              </button>
            );
          })}
          <div className="bg-ink text-chalk absolute -bottom-px -left-px px-[10px] pt-[6px] pb-[5px]">
            <span className="text-chalk font-kept-mono text-[9px] tracking-[0.1em] uppercase">
              {object.keepers} people kept one
            </span>
          </div>
        </div>

        <div className="bg-ink border-ink mt-[13px] grid grid-cols-3 gap-px border">
          {object.facts.map((fact) => (
            <div key={fact.label} className="bg-chalk px-[10px] py-[8px]">
              <div className="text-ink-faint font-kept-mono mb-[3px] text-[8px] tracking-[0.1em] uppercase">
                {fact.label}
              </div>
              <div className="font-kept-mono text-[11.5px] font-medium lining-nums tabular-nums">
                {fact.value}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/add"
          className="border-ink bg-ink text-chalk hover:bg-oxblood hover:border-oxblood mt-[18px] flex h-[52px] w-full items-center justify-center gap-[9px] border text-[15px] font-semibold no-underline"
        >
          Stick your memory on
        </Link>
      </div>
    </div>
  );
};
