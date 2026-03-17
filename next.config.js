const {i18n} = require("./next-i18next.config");

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "share.d-dimitrov.eu",
                pathname: "/**", // Позволяваме всички пътища от този домейн
            },
        ],
    },
    async rewrites() {
        return [
            {
                // Когато в кода напишеш "/upload/...", Next.js ще го потърси на бекенда
                source: "/upload/:path*",
                destination: "https://share.d-dimitrov.eu/upload/:path*",
            },
        ];
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
    i18n,
};

module.exports = nextConfig;