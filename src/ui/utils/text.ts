const WHITESPACE = /\s+/;
const PARAGRAPH_BREAK = /\n{2,}/;

export const splitWords = (text: string) => text.trim().split(WHITESPACE).filter(Boolean);

export const countWords = (text: string) => splitWords(text).length;

export const splitParagraphs = (text: string) =>
  text
    .split(PARAGRAPH_BREAK)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export const slugify = (raw: string) =>
  raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
