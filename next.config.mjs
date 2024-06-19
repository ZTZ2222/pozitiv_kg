import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/libs/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // add pozitiv.kg to domains
  images: {
    domains: ["pozitiv.kg"],
  },
};

export default withNextIntl(nextConfig);
