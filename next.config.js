const path = require('path');
const nextConfig = {
  images: {
    domains: [''],
    disableStaticImages: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
