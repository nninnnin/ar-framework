import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    emotion: true,
  },
  env: {
    MEMEX_TOKEN: process.env.MEMEX_TOKEN,
    MEMEX_PROJECT_ID: process.env.MEMEX_PROJECT_ID,
  },
};

export default nextConfig;
