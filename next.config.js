/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Live Anywhere section uses original papareact.com card images
      { protocol: "https", hostname: "links.papareact.com" },
      // Fallback for any API-sourced property images (muscache CDN)
      { protocol: "https", hostname: "**.muscache.com" },
      { protocol: "https", hostname: "a0.muscache.com" },
      // jsonkeeper thumbnails
      { protocol: "https", hostname: "jsonkeeper.com" },
      // Airbnb logo still served from papareact in some flows
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoiZmRyaXZlIiwiYSI6ImNsYWx5ODh3ZzA5dWYzcHQ3dnF1MHQ4ZzQifQ.nV5zYbZJiCHLsIv8t6Xcuw",
  },
};

module.exports = nextConfig;
