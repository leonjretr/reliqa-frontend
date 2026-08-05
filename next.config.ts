import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit .next/standalone — a self-contained server bundle with only the
  // node_modules it actually traced. The Dockerfile's runner stage copies it
  // instead of installing dependencies again.
  output: "standalone",
};

export default nextConfig;
