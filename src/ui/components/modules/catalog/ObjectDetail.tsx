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
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      <div className="grain" />
      <ScreenHeader
        section={object.category}
        right={`${object.keepers} kept`}
        back={{ href: "/browse", label: "the catalogue" }}
      />
      <div className="kept-col" style={{ flex: 1, minHeight: 0, padding: "16px 18px 24px" }}>
        <h1
          style={{
            margin: "0 0 7px",
            fontFamily: "var(--serif)",
            fontWeight: 700,
            fontSize: 46,
            lineHeight: 0.94,
            letterSpacing: "-.03em",
          }}
        >
          {object.name}
        </h1>
        <p
          style={{
            margin: "0 0 15px",
            fontFamily: "var(--serif)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: 18,
            lineHeight: 1.38,
            color: "var(--ink-2)",
            maxWidth: "33ch",
          }}
        >
          {object.blurb}
        </p>

        <div style={{ position: "relative", height: 398, border: "var(--key)" }}>
          <KeptPhoto category={object.category} style={{ position: "absolute", inset: 0 }} />
          {labels.map((label, index) => {
            const [x, y, rotate] = POSITIONS[index];
            const stock = STOCK[label.stock % STOCK.length];
            const isActive = open === index;
            return (
              <button
                key={label.keeperSlug + index}
                onClick={() => setOpen(isActive ? null : index)}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: 174,
                  textAlign: "left",
                  padding: "10px 12px 11px",
                  background: stock.bg,
                  color: stock.fg,
                  border: "var(--key)",
                  borderRadius: 3,
                  transform: `rotate(${rotate}deg) translateY(${isActive ? -16 : 0}px) scale(${isActive ? 1.04 : 1})`,
                  boxShadow: isActive
                    ? "0 16px 26px -10px rgba(31,26,21,.5)"
                    : "0 2.5px 0 rgba(31,26,21,.2)",
                  zIndex: isActive ? 9 : index + 1,
                  transition: "transform 340ms cubic-bezier(.2,.9,.2,1), box-shadow 340ms",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 3,
                    opacity: 0.76,
                  }}
                >
                  <span className="sc" style={{ color: "currentColor", fontSize: 8.5 }}>
                    {label.place}
                  </span>
                  <span className="sc fig" style={{ color: "currentColor", fontSize: 8.5 }}>
                    {label.year}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 1.12,
                  }}
                >
                  {label.name}
                </div>
                {isActive && (
                  <>
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontFamily: "var(--serif)",
                        fontWeight: 300,
                        fontSize: 13.5,
                        lineHeight: 1.42,
                      }}
                    >
                      {label.text}
                    </p>
                    <Link
                      href={`/keeper/${label.keeperSlug}`}
                      className="sc"
                      style={{ display: "inline-block", marginTop: 8, color: "currentColor" }}
                    >
                      their shelf →
                    </Link>
                  </>
                )}
              </button>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: -1,
              bottom: -1,
              background: "var(--ink)",
              color: "var(--chalk)",
              padding: "6px 10px 5px",
            }}
          >
            <span className="sc" style={{ color: "var(--chalk)" }}>
              {object.keepers} people kept one
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: 13,
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 1,
            background: "var(--ink)",
            border: "var(--key)",
          }}
        >
          {object.facts.map((fact) => (
            <div key={fact.label} style={{ background: "var(--chalk)", padding: "8px 10px" }}>
              <div className="sc" style={{ fontSize: 8, marginBottom: 3 }}>
                {fact.label}
              </div>
              <div className="fig" style={{ fontSize: 11.5, fontWeight: 500 }}>
                {fact.value}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/add"
          className="btn"
          style={{ width: "100%", marginTop: 18, textDecoration: "none", color: "var(--chalk)" }}
        >
          Stick your memory on
        </Link>
      </div>
    </div>
  );
};
