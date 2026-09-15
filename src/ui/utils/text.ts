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

const USERNAME_DISALLOWED = /[^a-z0-9-]/gi;

export const sanitizeUsername = (raw: string) => raw.replace(USERNAME_DISALLOWED, "").toLowerCase();

export const splitFullName = (name: string) => {
  const [firstName = "", ...rest] = splitWords(name);
  return { firstName, lastName: rest.join(" ") };
};

const NON_DIGITS = /\D/g;

export const sanitizeDigits = (raw: string, maxLength: number) =>
  raw.replace(NON_DIGITS, "").slice(0, maxLength);
