"use client";

import { usePathname } from "@/lib/i18nNavigation";
import { zSocialRead } from "@/types/other.schema";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Search from "./Search";
import useMediaQuery from "@/hooks/useMediaQuery";

const socials: zSocialRead[] = [
  {
    title: "instagram",
    image: "/assets/socials/instagram.svg",
    link: "https://www.instagram.com/",
  },
  {
    title: "whatsapp",
    image: "/assets/socials/whatsapp.svg",
    link: "https://www.whatsapp.com/",
  },
  {
    title: "telegram",
    image: "/assets/socials/telegram.svg",
    link: "https://telegram.org/",
  },
  {
    title: "tiktok",
    image: "/assets/socials/tiktok.svg",
    link: "https://www.tiktok.com/",
  },
  {
    title: "facebook",
    image: "/assets/socials/facebook.svg",
    link: "https://www.facebook.com/",
  },
  {
    title: "youtube",
    image: "/assets/socials/youtube.svg",
    link: "https://www.youtube.com/",
  },
];

const Footer = () => {
  const t = useTranslations("Footer");

  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isWideDesktop = useMediaQuery("(min-width: 1536px)");

  const pathname = usePathname();
  if (pathname.includes("/chat") && !isDesktop) return null;
  return (
    <footer className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white">
      {/* Logo */}
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="relative h-[117px] w-[100px]">
          <Image
            src="/assets/logo/circle-logo-big.png"
            alt="Logo"
            fill
            className="object-contain"
            sizes="50vw"
          />
        </Link>
        {isDesktop && <Search />}
      </div>

      {/* Ornaments */}
      <div className="container mb-5 flex overflow-hidden md:mb-7">
        {Array.from({
          length: isTablet ? 3 : isDesktop ? 4 : isWideDesktop ? 5 : 2,
        }).map((_, index) => (
          <div key={index} className="relative h-4 w-full">
            <Image
              src="/assets/ornament-down-mobile.svg"
              alt="Ornaments"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="container mb-10 flex flex-col justify-between gap-[50px] md:flex-row">
        <nav className="space-y-9">
          <h6 className="font-bold uppercase">{t("my_profile")}</h6>
          <div className="flex flex-col gap-[30px]">
            <Link href="/profile" prefetch>
              {t("personal_account")}
            </Link>
            <Link href="/ads/post" prefetch>
              {t("post_ad")}
            </Link>
            <Link href="/favorites" prefetch>
              {t("favorites")}
            </Link>
            <Link href="/chat" prefetch>
              {t("chats")}
            </Link>
          </div>
        </nav>
        {/* Justify self center */}
        <nav className="space-y-9">
          <h6 className="font-bold uppercase">{t("support")}</h6>
          <div className="flex flex-col gap-[30px]">
            <Link
              href="mailto:support.pozitiv@gmail.com"
              className="inline-block"
            >
              support.pozitiv@gmail.com
            </Link>
            <span>+996 555 10 20 50</span>
            <span>+996 500 10 20 50</span>
          </div>
        </nav>
        <nav className="space-y-[30px]">
          <h6 className="font-bold uppercase">{t("socials")}</h6>
          <div className="flex gap-[26px]">
            {socials.map((social) => (
              <Link key={social.title} href={social.link} target="_blank">
                <Image
                  src={social.image}
                  alt={social.title}
                  width={40}
                  height={40}
                />
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Copyright */}
      <div className="container text-wrap pb-[30px] text-lg">
        {t("copyright")}
      </div>

      {/* Website stats */}
      <div className="container pb-[121px] md:pb-12">
        <Image
          src="/assets/socials/stats.png"
          alt="website stats"
          width={88}
          height={31}
          priority
        />
      </div>
    </footer>
  );
};

export default Footer;
