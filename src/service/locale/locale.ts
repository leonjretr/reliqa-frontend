import "server-only";

import { hasLocale } from "next-intl";
import { cookies } from "next/headers";

import { LOCALE_COOKIE, ROUTING, type Locale } from "@/config";
import { getCurrentUser } from "@/service/api";

export const applyPreferredLocale = async (): Promise<Locale | undefined> => {
  const user = await getCurrentUser();

  if (!user.success || !hasLocale(ROUTING.locales, user.settings.language)) {
    return undefined;
  }

  const store = await cookies();
  store.set(LOCALE_COOKIE.name, user.settings.language, {
    sameSite: LOCALE_COOKIE.sameSite,
    path: LOCALE_COOKIE.path,
  });

  return user.settings.language;
};
