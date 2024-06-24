import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // add pozitiv.kg to domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pozitiv.kg",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
