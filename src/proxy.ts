import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { PATHNAME_HEADER, ROUTING } from "@/config";

const handleRouting = createMiddleware(ROUTING);

const proxy = (request: NextRequest) => {
  request.headers.set(PATHNAME_HEADER, `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return handleRouting(request);
};

export default proxy;

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
