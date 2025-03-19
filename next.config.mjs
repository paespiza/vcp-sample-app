import BuilderDevTools from "@builder.io/dev-tools/next";
import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shopifycdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'burst.shopifycdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["isolated-vm"],
  },
};
// export default nextConfig;
const isProd = process.env.NODE_ENV === "production";

// Only use hydration overlay in development
const configWithOverlay = isProd
  ? nextConfig
  : BuilderDevTools()(
      withHydrationOverlay({
        appRootSelector: "main",
      })(nextConfig)
    );

export default configWithOverlay;

