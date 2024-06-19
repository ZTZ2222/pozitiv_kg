"use client";

import { usePathname } from "@/libs/i18nNavigation";
import { socials } from "@/utils/fake_api";
import { chatRouteRegex } from "@/utils/Helpers";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const t = useTranslations("Footer");
  const pathname = usePathname();

  if (chatRouteRegex.test(pathname)) return null;
  return (
    <footer className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white">
      <div className="container flex py-5">
        <Link href="/" className="relative h-[117px] w-[100px]">
          <Image
            src="/assets/logo/circle-logo.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </Link>
      </div>
      <div className="relative mb-5 h-4 w-full self-end">
        <Image
          src="/assets/ornament-down.png"
          alt="Ornaments"
          fill
          className="object-contain"
        />
      </div>
      <div className="container mb-10 space-y-[50px]">
        <nav className="space-y-9">
          <h6 className="font-bold uppercase">{t("my_profile")}</h6>
          <div className="flex flex-col gap-[30px]">
            <Link href="#">{t("personal_account")}</Link>
            <Link href="#">{t("post_ad")}</Link>
            <Link href="#">{t("favorites")}</Link>
            <Link href="#">{t("chats")}</Link>
          </div>
        </nav>
        <nav className="space-y-9">
          <h6 className="font-bold uppercase">{t("support")}</h6>
          <div className="flex flex-col gap-[30px]">
            <Link href="#">support.pozitiv@gmail.com</Link>
            <Link href="#">+996 555 10 20 50</Link>
            <Link href="#">+996 500 10 20 50</Link>
          </div>
        </nav>
        <nav className="space-y-[30px]">
          <h6 className="font-bold uppercase">{t("socials")}</h6>
          <div className="flex gap-[26px]">
            {socials.map((social, idx) => (
              <Link
                key={idx}
                href={social.link}
                target="_blank"
                className="grid h-10 w-10 place-items-center rounded-[10px] bg-white"
              >
                <Image
                  src={social.image}
                  alt={social.title}
                  width={20}
                  height={20}
                  priority
                />
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className="container text-wrap pb-[30px] text-lg">
        {t("copyright")}
      </div>
      <div className="container pb-[121px]">
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
