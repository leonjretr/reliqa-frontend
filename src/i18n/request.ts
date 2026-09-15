import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import * as rootParams from "next/root-params";

import { ROUTING } from "@/config";

export default getRequestConfig(async () => {
  const requested = await rootParams.locale();
  const locale = hasLocale(ROUTING.locales, requested) ? requested : ROUTING.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
