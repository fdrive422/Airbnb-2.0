/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["links.papareact.com", "jsonkeeper.com", "a0.muscache.com", "localhost"],
  },
  env: {
    mapbox_key: 'pk.eyJ1IjoiZmRyaXZlIiwiYSI6ImNsYWx5ODh3ZzA5dWYzcHQ3dnF1MHQ4ZzQifQ.nV5zYbZJiCHLsIv8t6Xcuw',
  },
};

module.exports = nextConfig;