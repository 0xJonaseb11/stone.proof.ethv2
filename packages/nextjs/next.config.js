// next.config.js
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Apply fallbacks ONLY on client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        "@react-native-async-storage/async-storage": false,
        "react-native": false,
      };
    }

    config.externals.push("pino-pretty", "lokijs", "encoding");

    return config;
  },
};

const isIpfs = process.env.NEXT_PUBLIC_IPFS_BUILD === "true";

if (isIpfs) {
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;
  nextConfig.skipTrailingSlashRedirect = true;
  nextConfig.images = {
    unoptimized: true,
  };
}

module.exports = nextConfig;
