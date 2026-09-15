import { hasLocale } from "next-intl";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { LOCALE_HEADER, PATHNAME_HEADER, ROUTING } from "@/config";

const handleRouting = createMiddleware(ROUTING);

const proxy = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  const [, segment] = pathname.split("/");

  request.headers.set(PATHNAME_HEADER, `${pathname}${search}`);

  if (hasLocale(ROUTING.locales, segment)) {
    request.headers.set(LOCALE_HEADER, segment);
  }

  return handleRouting(request);
};

export default proxy;

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
