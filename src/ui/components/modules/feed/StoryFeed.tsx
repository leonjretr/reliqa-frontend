"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Link } from "@/i18n";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { cn } from "@/ui/utils/shadcn";

import { groupThousands, hasObjectPage, STORIES, type Story } from "./data";

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

const Slide = ({ story, index }: { story: Story; index: number }) => {
  const objectHref = hasObjectPage(story.objectSlug) ? `/thing/${story.objectSlug}` : null;

  return (
    <section
      data-slide={index}
      className="relative h-full w-full flex-none snap-start snap-always overflow-hidden"
    >
      <KeptPhoto
        category={story.category}
        src={story.photo}
        alt={`${story.model} kept by ${story.name}`}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,14,9,0.92)_0%,rgba(20,14,9,0.5)_38%,rgba(20,14,9,0)_70%)]" />

      <div className="absolute right-[12px] bottom-[132px] z-[3] flex flex-col items-center gap-[20px]">
        <div className="flex flex-col items-center gap-[3px]">
          <span className="text-chalk font-kept-mono text-[17px] font-medium lining-nums tabular-nums">
            {groupThousands(story.keepers)}
          </span>
          <span className="text-chalk/72 font-kept-mono text-[8px] tracking-[0.1em] uppercase">
            kept one
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
        {objectHref && (
          <RailButton
            href={objectHref}
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
        )}
      </div>

      <div className="absolute right-[62px] bottom-[22px] left-0 z-[3] px-[18px]">
        <div className="text-chalk/72 font-kept-mono text-[9px] tracking-[0.1em] uppercase">
          {story.kind} · {story.year}
        </div>
        <div className="text-chalk mt-[6px] text-[26px] leading-[1.04] font-bold tracking-[-0.02em]">
          {story.name}
        </div>
        <div className="text-chalk/72 font-kept-mono mt-[4px] text-[9px] tracking-[0.1em] uppercase">
          {story.place} · {story.relation} · {story.model}
        </div>
        <p className="text-chalk mt-[12px] text-[19px] leading-[1.4] font-light">“{story.text}”</p>
        <Link href={`/story/${story.slug}`} className="mt-[12px] inline-block no-underline">
          <span className="font-kept-mono text-[9px] tracking-[0.1em] text-[#e6a94d] uppercase">
            read the whole thing →
          </span>
        </Link>
      </div>
    </section>
  );
};

export const StoryFeed = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const slides = root.querySelectorAll<HTMLElement>("[data-slide]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActive(Number(entry.target.getAttribute("data-slide")));
          }
        });
      },
      { root, threshold: [0.6] },
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full bg-[#140e09]">
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-[6] flex items-baseline justify-between bg-[linear-gradient(to_bottom,rgba(20,14,9,0.6)_0%,rgba(20,14,9,0)_100%)] px-[18px] pt-[14px] pb-[22px]">
        <span className="text-chalk text-[15px] font-bold">Reliqa</span>
        <span className="text-chalk/72 font-kept-mono text-[9px] tracking-[0.1em] uppercase lining-nums tabular-nums">
          {active + 1} / {STORIES.length}
        </span>
      </div>

      <div className="pointer-events-none absolute top-[14px] right-[18px] left-[18px] z-[6] mt-[34px] flex gap-[3px]">
        {STORIES.map((story, index) => (
          <div
            key={story.slug}
            className={cn("h-[2px] flex-1", index <= active ? "bg-[#e6a94d]" : "bg-chalk/28")}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="kept-scroll h-full snap-y snap-mandatory overflow-y-auto [-webkit-overflow-scrolling:touch]"
      >
        {STORIES.map((story, index) => (
          <Slide key={story.slug} story={story} index={index} />
        ))}
      </div>
    </div>
  );
};
