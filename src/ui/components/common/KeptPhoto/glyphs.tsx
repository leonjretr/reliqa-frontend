import type { ReactNode } from "react";

export const GLYPH_STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const GLYPHS: Record<string, ReactNode> = {
  cameras: (
    <>
      <path
        d="M6 20h36a3 3 0 0 0 3-3V13a3 3 0 0 0-3-3h-6l-2.5-4h-11L20 10H6a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3Z"
        transform="translate(0 6)"
      />
      <circle cx="24" cy="25" r="8" />
      <circle cx="24" cy="25" r="3.2" />
    </>
  ),
  phones: (
    <>
      <rect x="15" y="6" width="18" height="36" rx="3" />
      <path d="M20 11h8" />
      <circle cx="24" cy="37" r="1.4" />
    </>
  ),
  "record-players": (
    <>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="4" />
      <path d="M33 15l6-4" />
    </>
  ),
  kitchen: (
    <>
      <path d="M14 20h14v10a8 8 0 0 1-8 8h0a8 8 0 0 1-8-8V20Z" />
      <path d="M28 23h5a4 4 0 0 1 0 8h-3" />
      <path d="M17 10l-2 6M23 10l-2 6" />
    </>
  ),
  sewing: (
    <>
      <path d="M8 34h22a8 8 0 0 0 8-8V12" />
      <path d="M30 12h8" />
      <path d="M34 12v14" />
      <path d="M8 34v-6" />
    </>
  ),
  radios: (
    <>
      <rect x="6" y="15" width="36" height="21" rx="2" />
      <circle cx="33" cy="25.5" r="5" />
      <path d="M12 21h13M12 25.5h13M12 30h13" />
      <path d="M15 15l7-6" />
    </>
  ),
  books: (
    <>
      <path d="M24 14c-4-3-10-3-14-1v22c4-2 10-2 14 1 4-3 10-3 14-1V13c-4-2-10-2-14 1Z" />
      <path d="M24 14v22" />
    </>
  ),
  clothing: (
    <>
      <path d="M17 10 10 15v6h5v17h18V21h5v-6l-7-5-3 3h-8l-3-3Z" />
    </>
  ),
  jewellery: (
    <>
      <circle cx="24" cy="28" r="10" />
      <path d="M19 18l5-8 5 8" />
      <circle cx="24" cy="18" r="2.4" />
    </>
  ),
  letters: (
    <>
      <rect x="8" y="14" width="32" height="22" rx="2" />
      <path d="M8 16l16 13 16-13" />
    </>
  ),
  photographs: (
    <>
      <rect x="10" y="10" width="22" height="22" rx="1" transform="rotate(-6 21 21)" />
      <rect x="14" y="14" width="22" height="22" rx="1" transform="rotate(6 25 25)" />
    </>
  ),
  tableware: (
    <>
      <path d="M12 20h18v8a9 9 0 0 1-9 9h0a9 9 0 0 1-9-9v-8Z" />
      <path d="M30 22h4a4 4 0 0 1 0 8h-3" />
      <ellipse cx="21" cy="39" rx="13" ry="2.4" />
    </>
  ),
  toys: (
    <>
      <rect x="14" y="24" width="20" height="14" rx="2" />
      <circle cx="24" cy="16" r="6" />
    </>
  ),
  watches: (
    <>
      <circle cx="24" cy="24" r="10" />
      <path d="M24 18v6l4 3" />
      <path d="M20 8h8l-1 6h-6l-1-6Z" />
      <path d="M20 40h8l-1-6h-6l-1 6Z" />
    </>
  ),
};

export const FALLBACK_GLYPH: ReactNode = (
  <>
    <rect x="10" y="12" width="28" height="24" rx="2" />
    <path d="M10 30l8-7 6 5 6-6 8 8" />
    <circle cx="18" cy="20" r="2.4" />
  </>
);
