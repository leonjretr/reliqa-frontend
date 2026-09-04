"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Link } from "@/i18n";
import { loadFeedEntries } from "@/service/actions";
import type { FeedEntry } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { cn } from "@/ui/utils/shadcn";

import { groupThousands } from "./data";
import { buildFeedCard, type FeedCard } from "./feedCard";

const LOAD_MORE_BATCH_SIZE = 4;
const LOAD_MORE_THRESHOLD = 2;

const RailButton = ({
  href,
  glyph,
  label,
  filled,
}: {
  href: string;
  glyph: ReactNode;
  label: string;
  filled?: boolean;
}) => (
  <Link href={href} className="text-chalk flex flex-col items-center gap-[5px] no-underline">
    <span
      className={cn(
        "text-chalk flex h-[44px] w-[44px] items-center justify-center rounded-full border backdrop-blur-[2px]",
        filled ? "bg-oxblood border-oxblood" : "border-chalk/50 bg-[rgba(20,14,9,0.35)]",
      )}
    >
      {glyph}
    </span>
    <span className="text-chalk/72 font-kept-mono text-[8px] tracking-[0.1em] uppercase">
      {label}
    </span>
  </Link>
);

const Slide = ({ card, index }: { card: FeedCard; index: number }) => {
  const subtitle = [card.category, card.year].filter(Boolean).join(" · ");
  const tagLine = card.tags.slice(0, 3).join(" · ");

  return (
    <section
      data-slide={index}
      className="relative h-full w-full flex-none snap-start snap-always overflow-hidden"
    >
      <KeptPhoto
        category={card.category?.toLowerCase()}
        src={card.photo}
        alt={card.keeperName}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,14,9,0.92)_0%,rgba(20,14,9,0.5)_38%,rgba(20,14,9,0)_70%)]" />

      <div className="absolute right-[12px] bottom-[132px] z-[3] flex flex-col items-center gap-[20px]">
        <div className="flex flex-col items-center gap-[3px]">
          <span className="text-chalk font-kept-mono text-[17px] font-medium lining-nums tabular-nums">
            {groupThousands(card.viewCount)}
          </span>
          <span className="text-chalk/72 font-kept-mono text-[8px] tracking-[0.1em] uppercase">
            seen
          </span>
        </div>
        <RailButton
          href="/add"
          filled
          label="add yours"
          glyph={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          }
        />
        <RailButton
          href={`/thing/${card.objectId}`}
          label="the object"
          glyph={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          }
        />
      </div>

      <div className="absolute right-[62px] bottom-[22px] left-0 z-[3] px-[18px]">
        {subtitle && (
          <div className="text-chalk/72 font-kept-mono text-[9px] tracking-[0.1em] uppercase">
            {subtitle}
          </div>
        )}
        <div className="text-chalk mt-[6px] text-[26px] leading-[1.04] font-bold tracking-[-0.02em]">
          {card.keeperName}
        </div>
        {tagLine && (
          <div className="text-chalk/72 font-kept-mono mt-[4px] text-[9px] tracking-[0.1em] uppercase">
            {tagLine}
          </div>
        )}
        {card.quote ? (
          <p className="text-chalk mt-[12px] text-[19px] leading-[1.4] font-light">
            “{card.quote}”
          </p>
        ) : (
          <p className="text-chalk/50 mt-[12px] text-[15px] leading-[1.4] font-light italic">
            Nobody has told this object’s story yet.
          </p>
        )}
        {card.storyId && (
          <Link href={`/story/${card.storyId}`} className="mt-[12px] inline-block no-underline">
            <span className="font-kept-mono text-[9px] tracking-[0.1em] text-[#e6a94d] uppercase">
              read the whole thing →
            </span>
          </Link>
        )}
      </div>
    </section>
  );
};

const dedupeEntries = (entries: FeedEntry[]): FeedEntry[] => {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.object.id)) return false;
    seen.add(entry.object.id);
    return true;
  });
};

export const StoryFeed = ({ initialEntries }: { initialEntries: FeedEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entries, setEntries] = useState(() => dedupeEntries(initialEntries));
  const [active, setActive] = useState(0);
  const isLoadingRef = useRef(false);
  const reachedEndRef = useRef(false);
  const seenIdsRef = useRef(new Set(entries.map((entry) => entry.object.id)));

  const cards = entries.map((entry) => buildFeedCard(entry));

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const slides = root.querySelectorAll<HTMLElement>("[data-slide]");
    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((observedEntry) => {
          if (observedEntry.isIntersecting && observedEntry.intersectionRatio >= 0.6) {
            setActive(Number(observedEntry.target.getAttribute("data-slide")));
          }
        });
      },
      { root, threshold: [0.6] },
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [cards.length]);

  useEffect(() => {
    if (reachedEndRef.current || isLoadingRef.current) return;
    if (active < cards.length - LOAD_MORE_THRESHOLD) return;

    isLoadingRef.current = true;
    loadFeedEntries(LOAD_MORE_BATCH_SIZE, [...seenIdsRef.current]).then((moreEntries) => {
      isLoadingRef.current = false;

      const additions = moreEntries.filter((entry) => !seenIdsRef.current.has(entry.object.id));

      if (additions.length === 0) {
        reachedEndRef.current = true;
        return;
      }

      additions.forEach((entry) => seenIdsRef.current.add(entry.object.id));
      setEntries((current) => [...current, ...additions]);
    });
  }, [active, cards.length]);

  if (cards.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#140e09] px-[24px] text-center">
        <p className="text-chalk/72 font-kept-mono text-[11px] tracking-[0.1em] uppercase">
          Nothing kept yet. Be the first to add something.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-[#140e09]">
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-[6] flex items-baseline justify-between bg-[linear-gradient(to_bottom,rgba(20,14,9,0.6)_0%,rgba(20,14,9,0)_100%)] px-[18px] pt-[14px] pb-[22px]">
        <span className="text-chalk text-[15px] font-bold">Reliqa</span>
        <span className="text-chalk/72 font-kept-mono text-[9px] tracking-[0.1em] uppercase lining-nums tabular-nums">
          {active + 1} / {cards.length}
        </span>
      </div>

      <div className="pointer-events-none absolute top-[14px] right-[18px] left-[18px] z-[6] mt-[34px] flex gap-[3px]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={cn("h-[2px] flex-1", index <= active ? "bg-[#e6a94d]" : "bg-chalk/28")}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="kept-scroll h-full snap-y snap-mandatory overflow-y-auto [-webkit-overflow-scrolling:touch]"
      >
        {cards.map((card, index) => (
          <Slide key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  );
};
