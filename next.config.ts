import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Liquid Glass dashboard moved into the home page showcase.
      { source: "/docs/blocks/liquid-glass-dashboard", destination: "/#showcase", permanent: true },
    ];
  },
};

export default nextConfig;
