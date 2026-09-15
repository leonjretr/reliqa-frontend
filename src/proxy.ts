import createMiddleware from "next-intl/middleware";

import { ROUTING } from "@/config";

export default createMiddleware(ROUTING);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
