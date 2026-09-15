import { defineRouting } from "next-intl/routing";

export const ROUTING = defineRouting({
  locales: ["en", "uk", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof ROUTING.locales)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "english",
  uk: "українська",
  ru: "русский",
};
