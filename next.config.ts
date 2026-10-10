import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Liquid Glass dashboard moved into the home page showcase.
      { source: "/docs/blocks/liquid-glass-dashboard", destination: "/#showcase", permanent: true },
      // The CRM dashboard is a demo, not a block: it lives in the showcase too.
      { source: "/docs/blocks/crm-dashboard", destination: "/#showcase", permanent: true },
      // Sicons (0.6) was replaced by the Tabler icon set in 0.7.
      { source: "/docs/sicons", destination: "/docs/icons", permanent: true },
    ];
  },
};

export default nextConfig;
