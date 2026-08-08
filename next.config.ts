import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Emit .next/standalone — a self-contained server bundle with only the
  // node_modules it actually traced. The Dockerfile's runner stage copies it
  // instead of installing dependencies again.
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
