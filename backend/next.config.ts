import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "http://localhost:3000",
        "https://serve-ai-five.vercel.app"
      ],
    },
  },
};

export default nextConfig;