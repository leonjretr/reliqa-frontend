import type { Duotone, Stock } from "@/ui/types";

export const STOCK: Stock[] = [
  { bg: "var(--color-oxblood)", fg: "var(--color-oxblood-paper)" },
  { bg: "var(--color-ochre)", fg: "var(--color-ink)" },
  { bg: "var(--color-plum)", fg: "var(--color-blush)" },
  { bg: "var(--color-olive)", fg: "var(--color-olive-paper)" },
  { bg: "var(--color-slate)", fg: "var(--color-slate-paper)" },
  { bg: "var(--color-stock-2)", fg: "var(--color-ink)" },
];

export const AVATAR_TONES = [
  "var(--color-oxblood)",
  "var(--color-ochre)",
  "var(--color-plum)",
  "var(--color-olive)",
  "var(--color-slate)",
];

export const DUOTONES: Record<string, Duotone> = {
  cameras: { hue: "var(--color-duotone-cameras)", deep: "var(--color-duotone-cameras-deep)" },
  phones: { hue: "var(--color-duotone-phones)", deep: "var(--color-duotone-phones-deep)" },
  "record-players": {
    hue: "var(--color-duotone-record-players)",
    deep: "var(--color-duotone-record-players-deep)",
  },
  kitchen: { hue: "var(--color-duotone-kitchen)", deep: "var(--color-duotone-kitchen-deep)" },
  sewing: { hue: "var(--color-duotone-sewing)", deep: "var(--color-duotone-sewing-deep)" },
  radios: { hue: "var(--color-duotone-radios)", deep: "var(--color-duotone-radios-deep)" },
  books: { hue: "var(--color-duotone-books)", deep: "var(--color-duotone-books-deep)" },
  clothing: { hue: "var(--color-duotone-clothing)", deep: "var(--color-duotone-clothing-deep)" },
  jewellery: {
    hue: "var(--color-duotone-jewellery)",
    deep: "var(--color-duotone-jewellery-deep)",
  },
  letters: { hue: "var(--color-duotone-letters)", deep: "var(--color-duotone-letters-deep)" },
  photographs: {
    hue: "var(--color-duotone-photographs)",
    deep: "var(--color-duotone-photographs-deep)",
  },
  tableware: {
    hue: "var(--color-duotone-tableware)",
    deep: "var(--color-duotone-tableware-deep)",
  },
  toys: { hue: "var(--color-duotone-toys)", deep: "var(--color-duotone-toys-deep)" },
  watches: { hue: "var(--color-duotone-watches)", deep: "var(--color-duotone-watches-deep)" },
};

export const FALLBACK_DUOTONE: Duotone = {
  hue: "var(--color-duotone-fallback)",
  deep: "var(--color-duotone-fallback-deep)",
};

export const NOTE_SHADOWS = {
  RESTING: "var(--shadow-note)",
  RAISED: "var(--shadow-note-raised)",
};
