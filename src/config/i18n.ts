import { defineRouting } from "next-intl/routing";

export const LOCALE_COOKIE = { name: "NEXT_LOCALE", sameSite: "lax", path: "/" } as const;

export const LOCALE_HEADER = "x-locale";

export const ROUTING = defineRouting({
  locales: ["en", "uk", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
  localeCookie: LOCALE_COOKIE,
});

export type Locale = (typeof ROUTING.locales)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "english",
  uk: "українська",
  ru: "русский",
};
