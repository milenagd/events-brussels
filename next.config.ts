import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "agendabrussels2.imgix.net",
      },
    ],
  },
};

export default nextConfig;
