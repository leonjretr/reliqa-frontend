"use client";

import { useState } from "react";

import { keeperPath, NOTE_SHADOWS, OBJECT_NOTES_SHOWN, PAGES, STOCK } from "@/config";
import { Link } from "@/i18n";
import type { APIObject, APIStoryListItem } from "@/service/types";
import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { keptButtonVariants } from "@/ui/components/common/KeptButton";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { ScreenHeader } from "@/ui/components/modules/navigation";
import { cn, formatKeeperName, formatYear } from "@/ui/utils";

const POSITIONS: [number, number, number][] = [
  [14, 18, -6],
  [192, 58, 4],
  [30, 168, 3],
  [158, 212, -3],
  [62, 296, -2],
];

type ObjectDetailProps = {
  object: APIObject;
  stories: APIStoryListItem[];
};

export const ObjectDetail = ({ object, stories }: ObjectDetailProps) => {
  const [open, setOpen] = useState<number | null>(null);
  const category = object.categories[0];
  const notes = stories.slice(0, OBJECT_NOTES_SHOWN);
  const facts = [
    { label: "category", value: category?.name ?? "—" },
    { label: "invented", value: object.invented_at ? formatYear(object.invented_at) : "—" },
    { label: "kept since", value: formatYear(object.created_at) },
  ];

  return (
    <div className="relative flex h-full flex-col">
      <ScreenHeader
        section={category?.name ?? "kept thing"}
        right={`${object.stories_count} ${object.stories_count === 1 ? "story" : "stories"}`}
        back={{ href: PAGES.BROWSE, label: "the catalogue" }}
      />
      <div className="kept-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4.5 pt-4 pb-6">
        <h1 className="text-display leading-display tracking-display mb-1.75 font-bold">
          {object.name}
        </h1>
        {object.description && (
          <p className="text-ink-2 max-w-lede text-lede leading-lede mb-3.75 font-light italic">
            {object.description}
          </p>
        )}

        <div className="border-ink relative isolate h-99.5 border">
          <KeptPhoto
            category={category?.slug}
            src={object.attachments[0]?.file.src ?? undefined}
            className="absolute inset-0"
          />
          {notes.map((story, index) => {
            const [x, y, rotate] = POSITIONS[index];
            const stock = STOCK[index % STOCK.length];
            const isActive = open === index;
            const keeperName = formatKeeperName(story.created_by);
            return (
              <button
                key={story.id}
                onClick={() => setOpen(isActive ? null : index)}
                className="border-ink rounded-paper ease-lift absolute w-43.5 cursor-pointer border px-3 pt-2.5 pb-2.75 text-left transition-[transform,box-shadow] duration-340"
                style={{
                  left: x,
                  top: y,
                  background: stock.bg,
                  color: stock.fg,
                  transform: `rotate(${rotate}deg) translateY(${isActive ? -16 : 0}px) scale(${isActive ? 1.04 : 1})`,
                  boxShadow: isActive ? NOTE_SHADOWS.RAISED : NOTE_SHADOWS.RESTING,
                  zIndex: isActive ? 9 : index + 1,
                }}
              >
                <div className="mb-0.75 flex items-baseline justify-between opacity-76">
                  <span className="font-kept-mono text-stamp tracking-widest uppercase lining-nums tabular-nums">
                    {formatYear(story.created_at)}
                  </span>
                </div>
                <div className="text-copy-lg leading-card font-semibold">{keeperName}</div>
                {isActive && (
                  <>
                    <p className="text-aside leading-quote-lg mt-2 font-light">
                      {story.short_story || "—"}
                    </p>
                    <Link
                      href={keeperPath(story.created_by.username)}
                      className="font-kept-mono text-eyebrow mt-2 inline-block tracking-widest uppercase"
                    >
                      their shelf →
                    </Link>
                  </>
                )}
              </button>
            );
          })}
          <div className="bg-ink text-chalk absolute -bottom-px -left-px px-2.5 pt-1.5 pb-1.25">
            <span className="text-chalk font-kept-mono text-eyebrow tracking-widest uppercase">
              {object.stories_count} {object.stories_count === 1 ? "story" : "stories"} stuck on
            </span>
          </div>
        </div>

        <div className="bg-ink border-ink mt-3.25 grid grid-cols-3 gap-px border">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-chalk px-2.5 py-2">
              <div className="text-ink-faint font-kept-mono text-micro mb-0.75 tracking-widest uppercase">
                {fact.label}
              </div>
              <div className="font-kept-mono text-fact font-medium lining-nums tabular-nums">
                {fact.value}
              </div>
            </div>
          ))}
        </div>

        <Link href={PAGES.ADD} className={cn(keptButtonVariants(), "mt-4.5 no-underline")}>
          Stick your memory on
        </Link>
      </div>
      <GrainOverlay />
    </div>
  );
};
