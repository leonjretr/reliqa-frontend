import "server-only";

import { headers } from "next/headers";

import { PAGES, PATHNAME_HEADER, type Locale } from "@/config";
import { redirect } from "@/i18n";
import { readPreferredLocale } from "@/service/locale";
import { getSession } from "@/service/session";

const stripLocale = (path: string) => {
  const rest = path.replace(/^\/[^/?]*/, "");
  return rest.startsWith("/") ? rest : `${PAGES.FEED}${rest}`;
};

export const requireSession = async (locale: string) => {
  const session = await getSession();

  if (!session) {
    redirect({ href: PAGES.LOGIN, locale });
  }

  return session;
};

export const redirectSignedIn = async (locale: string) => {
  if (await getSession()) {
    redirect({ href: PAGES.FEED, locale });
  }
};

export const requirePreferredLocale = async (locale: Locale) => {
  if (!(await getSession())) {
    return;
  }

  const language = await readPreferredLocale();

  if (!language || language === locale) {
    return;
  }

  const path = (await headers()).get(PATHNAME_HEADER);

  if (!path) {
    return;
  }

  redirect({ href: stripLocale(path), locale: language });
};
