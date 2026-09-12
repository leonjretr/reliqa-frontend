export type Stock = { bg: string; fg: string };

export const STOCK: Stock[] = [
  { bg: "#96382a", fg: "#f7efe7" },
  { bg: "#b3822c", fg: "#1f1a15" },
  { bg: "#63304a", fg: "#f6e9ee" },
  { bg: "#4a5a33", fg: "#f1f3e6" },
  { bg: "#3b4a55", fg: "#eef1f3" },
  { bg: "#ded4c0", fg: "#1f1a15" },
];

export const groupThousands = (value: number) => value.toLocaleString("en-US").replace(/,/g, " ");
