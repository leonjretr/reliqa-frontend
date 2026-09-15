"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import {
  FEED_LOAD_MORE_BATCH_SIZE,
  FEED_LOAD_MORE_THRESHOLD,
  FEED_TAGS_SHOWN,
  PAGES,
  storyPath,
  thingPath,
} from "@/config";
import { Link } from "@/i18n";
import { loadFeedEntries } from "@/service/actions";
import type { FeedEntry } from "@/service/types";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { cn, groupThousands } from "@/ui/utils";

import { buildFeedCard, type FeedCard } from "./feedCard";

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
  <Link href={href} className="text-chalk flex flex-col items-center gap-1.25 no-underline">
    <span
      className={cn(
        "text-chalk backdrop-blur-veil flex h-11 w-11 items-center justify-center rounded-full border",
        filled ? "bg-oxblood border-oxblood" : "border-chalk/50 bg-night/35",
      )}
    >
      {glyph}
    </span>
    <span className="text-chalk/72 font-kept-mono text-micro tracking-widest uppercase">
      {label}
    </span>
  </Link>
);

const Slide = ({
  card,
  index,
  containerRef,
}: {
  card: FeedCard;
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
}) => {
  const slideRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: slideRef,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 0.5, 1], ["9%", "0%", "-9%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const shade = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 0, 0.75]);
  const copyOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [48, 0, -24]);
  const railX = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [28, 0, 28]);

  const subtitle = [card.category, card.year].filter(Boolean).join(" · ");
  const tagLine = card.tags.slice(0, FEED_TAGS_SHOWN).join(" · ");

  return (
    <section
      ref={slideRef}
      data-slide={index}
      className="relative h-full w-full flex-none snap-start snap-always overflow-hidden"
    >
      <motion.div
        className="-top-parallax -bottom-parallax absolute inset-x-0"
        style={isReducedMotion ? undefined : { y: photoY, scale: photoScale }}
      >
        <KeptPhoto
          category={card.category?.toLowerCase()}
          src={card.photo}
          alt={card.name}
          className="absolute inset-0"
        />
      </motion.div>
      <div className="photo-shade-feed absolute inset-0" />

      <motion.div
        className="absolute right-3 bottom-33 flex flex-col items-center gap-5"
        style={{ opacity: copyOpacity, x: isReducedMotion ? 0 : railX }}
      >
        <div className="flex flex-col items-center gap-0.75">
          <span className="text-chalk font-kept-mono text-field font-medium lining-nums tabular-nums">
            {groupThousands(card.viewCount)}
          </span>
          <span className="text-chalk/72 font-kept-mono text-micro tracking-widest uppercase">
            seen
          </span>
        </div>
        <RailButton
          href={PAGES.ADD}
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
          href={thingPath(card.objectId)}
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
      </motion.div>

      <motion.div
        className="absolute right-15.5 bottom-5.5 left-0 px-4.5"
        style={{ opacity: copyOpacity, y: isReducedMotion ? 0 : copyY }}
      >
        {subtitle && (
          <div className="text-chalk/72 font-kept-mono text-eyebrow tracking-widest uppercase">
            {subtitle}
          </div>
        )}
        <div className="text-chalk text-title-lg leading-title tracking-snug mt-1.5 font-bold">
          {card.name}
        </div>
        {tagLine && (
          <div className="text-chalk/72 font-kept-mono text-eyebrow mt-1 tracking-widest uppercase">
            {tagLine}
          </div>
        )}
        {card.quote ? (
          <>
            <p className="text-chalk text-quote leading-quote mt-3 font-light">“{card.quote}”</p>
            <div className="text-chalk/72 font-kept-mono text-eyebrow mt-1.5 tracking-widest uppercase">
              — {card.keeperName}
            </div>
          </>
        ) : (
          <p className="text-chalk/50 text-copy leading-quote mt-3 font-light italic">
            Nobody has told this object’s story yet.
          </p>
        )}
        {card.storyId && (
          <Link href={storyPath(card.storyId)} className="mt-3 inline-block no-underline">
            <span className="font-kept-mono text-honey text-eyebrow tracking-widest uppercase">
              read the whole thing →
            </span>
          </Link>
        )}
      </motion.div>

      <motion.div
        className="bg-night pointer-events-none absolute inset-0"
        style={{ opacity: shade }}
      />
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
    if (active < cards.length - FEED_LOAD_MORE_THRESHOLD) return;

    isLoadingRef.current = true;
    loadFeedEntries(FEED_LOAD_MORE_BATCH_SIZE, [...seenIdsRef.current]).then((moreEntries) => {
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
      <div className="bg-night flex h-full w-full items-center justify-center px-6 text-center">
        <p className="text-chalk/72 font-kept-mono text-meta tracking-widest uppercase">
          Nothing kept yet. Be the first to add something.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-night relative h-full w-full">
      <div
        ref={containerRef}
        className="relative h-full snap-y snap-mandatory [scrollbar-width:none] overflow-y-auto [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, index) => (
          <Slide key={card.objectId} card={card} index={index} containerRef={containerRef} />
        ))}
      </div>

      <div className="feed-top-fade pointer-events-none absolute top-0 right-0 left-0 px-4.5 pt-3.5 pb-5.5">
        <span className="text-chalk text-copy font-bold">Reliqa</span>
      </div>
    </div>
  );
};
