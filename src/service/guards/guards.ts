import "server-only";

import { PAGES } from "@/config";
import { redirect } from "@/i18n";
import { getSession } from "@/service/session";

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
