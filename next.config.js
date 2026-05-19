/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "links.papareact.com" },
      { protocol: "https", hostname: "jsonkeeper.com" },
      { protocol: "https", hostname: "a0.muscache.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.muscache.com" },
    ],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoiZmRyaXZlIiwiYSI6ImNsYWx5ODh3ZzA5dWYzcHQ3dnF1MHQ4ZzQifQ.nV5zYbZJiCHLsIv8t6Xcuw",
  },
};

module.exports = nextConfig;
