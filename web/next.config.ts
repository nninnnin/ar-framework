import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    emotion: true,
  },
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    MEMEX_TOKEN: process.env.MEMEX_TOKEN,
    MEMEX_PROJECT_ID: process.env.MEMEX_PROJECT_ID,
    NEXT_URL: process.env.NEXT_URL,
  },
  reactStrictMode: false,
};

export default nextConfig;
