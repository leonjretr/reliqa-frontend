"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Link } from "@/i18n";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";

import { groupThousands, hasObjectPage, STORIES, type Story } from "./data";

const light = "rgba(246,241,232,.72)";
const chalk = "#f6f1e8";
const accent = "#e6a94d";

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
  <Link
    href={href}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
      textDecoration: "none",
      color: chalk,
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid rgba(246,241,232,.5)",
        background: filled ? "var(--oxblood)" : "rgba(20,14,9,.35)",
        borderColor: filled ? "var(--oxblood)" : "rgba(246,241,232,.5)",
        color: chalk,
        backdropFilter: "blur(2px)",
      }}
    >
      {glyph}
    </span>
    <span className="sc" style={{ color: light, fontSize: 8 }}>
      {label}
    </span>
  </Link>
);

const Slide = ({ story, index }: { story: Story; index: number }) => {
  const objectHref = hasObjectPage(story.objectSlug) ? `/thing/${story.objectSlug}` : null;

  return (
    <section
      data-slide={index}
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        flex: "none",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        overflow: "hidden",
      }}
    >
      <KeptPhoto
        category={story.category}
        src={story.photo}
        alt={`${story.model} kept by ${story.name}`}
        style={{ position: "absolute", inset: 0 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(20,14,9,.92) 0%, rgba(20,14,9,.5) 38%, rgba(20,14,9,0) 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 12,
          bottom: 132,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          zIndex: 3,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <span className="fig" style={{ color: chalk, fontSize: 17, fontWeight: 500 }}>
            {groupThousands(story.keepers)}
          </span>
          <span className="sc" style={{ color: light, fontSize: 8 }}>
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

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 62,
          bottom: 22,
          padding: "0 18px",
          zIndex: 3,
        }}
      >
        <div className="sc" style={{ color: light }}>
          {story.kind} · {story.year}
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 700,
            fontSize: 26,
            lineHeight: 1.04,
            letterSpacing: "-.02em",
            color: chalk,
            marginTop: 6,
          }}
        >
          {story.name}
        </div>
        <div className="sc" style={{ color: light, marginTop: 4 }}>
          {story.place} · {story.relation} · {story.model}
        </div>
        <p
          style={{
            margin: "12px 0 0",
            fontFamily: "var(--serif)",
            fontWeight: 300,
            fontSize: 19,
            lineHeight: 1.4,
            color: chalk,
          }}
        >
          “{story.text}”
        </p>
        <Link
          href={`/story/${story.slug}`}
          style={{ display: "inline-block", marginTop: 12, textDecoration: "none" }}
        >
          <span className="sc" style={{ color: accent }}>
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
    <div style={{ position: "relative", height: "100%", width: "100%", background: "#140e09" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 6,
          padding: "14px 18px 22px",
          background: "linear-gradient(to bottom, rgba(20,14,9,.6) 0%, rgba(20,14,9,0) 100%)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 15, color: chalk }}>
          Reliqa
        </span>
        <span className="sc fig" style={{ color: light }}>
          {active + 1} / {STORIES.length}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 14,
          right: 18,
          bottom: "auto",
          left: 18,
          zIndex: 6,
          display: "flex",
          gap: 3,
          pointerEvents: "none",
          marginTop: 34,
        }}
      >
        {STORIES.map((story, index) => (
          <div
            key={story.slug}
            style={{
              flex: 1,
              height: 2,
              background: index <= active ? accent : "rgba(246,241,232,.28)",
            }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="kept-col"
        style={{
          height: "100%",
          overflowY: "auto",
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {STORIES.map((story, index) => (
          <Slide key={story.slug} story={story} index={index} />
        ))}
      </div>
    </div>
  );
};
