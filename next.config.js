const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "share.d-dimitrov.eu",
        pathname: "/api/articles/**", // Пътят, който връща изображенията
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Home-page",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
