import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { MEDIA_REMOTE_PATTERNS } from "./src/config/media";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: MEDIA_REMOTE_PATTERNS,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
