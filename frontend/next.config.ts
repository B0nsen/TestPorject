import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
    images: {
        domains: ['amazon-clone-image-bucket.s3.amazonaws.com'],
    },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      oneOf: [
        {
          resourceQuery: /url/, 
          type: "asset/resource",
        },
        {
          resourceQuery: /react/,
          use: ["@svgr/webpack"],
        },
        {
          type: "asset/resource",
        },
      ],
    });

    return config;
  },
};

export default nextConfig;