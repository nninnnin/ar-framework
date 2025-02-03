import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    emotion: true,
  },
  env: {
    MEMEX_TOKEN: process.env.MEMEX_TOKEN,
  },
};

export default nextConfig;
