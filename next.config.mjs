import BuilderDevTools from "@builder.io/dev-tools/next";
import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.builder.io", pathname: "/**" },
      { protocol: "https", hostname: "shopifycdn.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
      { protocol: "https", hostname: "burst.shopifycdn.com", pathname: "/**" },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["isolated-vm"],
  },
};

// Check if we are in development mode
const isDev = process.env.NODE_ENV === "development";

// Conditionally apply withHydrationOverlay only in development
const configWithOverlay = isDev
  ? BuilderDevTools()(
      withHydrationOverlay({
        appRootSelector: "main",
      })(nextConfig)
    )
  : BuilderDevTools()(nextConfig);

export default configWithOverlay;
