import type { NextConfig } from "next";

type RemotePatterns = NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]>;

export const MEDIA_REMOTE_PATTERNS: RemotePatterns = [
  {
    protocol: "https",
    hostname: "**.amazonaws.com",
    pathname: "/media/**",
  },
];

export const LOCAL_PREVIEW_PROTOCOL = "blob:";

export const IMAGE_SIZES = {
  SCREEN: "420px",
  CARD: "200px",
  THUMBNAIL: "76px",
};
