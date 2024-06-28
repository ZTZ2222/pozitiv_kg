"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LocaleSwitcher from "@/components/navigation/LocaleSwitcher";
import Search from "./Search";
import MainFilter from "../filter/MainFilter";
import { cn, matchesRoute } from "@/lib/utils";
import { usePathname } from "@/lib/i18nNavigation";
import BackButton from "./BackButton";
import { Button } from "../ui/button";
import { Share } from "lucide-react";

import DotsDropdownMenu from "./DotsDropdownMenu";

const Header = () => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const pathname = usePathname();

  const searchFilterRoutes = ["/", "/favorites"];
  // const backbtnRoutes = [/^\/chats\/[^/]+$/];
  const backbtnShareDotsRoutes = [/^\/ads\/[^/]+$/];
  const backbtnChatsText = ["/chat"];
  // const backbtnUserInfoCallbtnDots = [/^\/chat\/[^/]+$/];

  if (!isSmallScreen) {
    return <header>Desktop View</header>;
  }

  return (
    <header>
      <div className="flex h-16 flex-col justify-between bg-gradient-to-r from-cyan-400 to-fuchsia-500">
        <div className="relative h-4 w-full">
          <Image
            src="/assets/ornament-up.png"
            alt="Ornaments"
            fill
            className="object-contain"
            sizes="(max-width: 600px) 100vw, 50vw"
          />
        </div>
        <div className="container flex items-center justify-between">
          <Link href="/" className="relative h-4 w-[120px]">
            <Image
              src="/assets/logo/pozitiv.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </Link>
          <LocaleSwitcher className="h-fit p-0 text-white/80" />
        </div>
        <div className="relative h-4 w-full self-end">
          <Image
            src="/assets/ornament-down.png"
            alt="Ornaments"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <nav className="container">
        {/* Search & Filter */}
        {matchesRoute(pathname, searchFilterRoutes) && (
          <div
            className={cn(
              "flex items-center justify-between gap-[18px] py-1.5 shadow-sm md:hidden",
              // "hidden",
            )}
          >
            <Search />
            <MainFilter />
          </div>
        )}

        {/* Back Button Router */}
        {/* {matchesRoute(pathname, backbtnRoutes) && (
            <>
              <BackButton variant="router" />
              <div>Back Button Routes</div>
            </>
          )} */}

        {/* Back Button, Share & Dots */}
        {matchesRoute(pathname, backbtnShareDotsRoutes) && (
          <div className="mt-[30px] flex justify-between">
            <BackButton variant="router" />
            <div className="flex items-center gap-2.5">
              <Button
                variant="ghost"
                size="xs"
                className="h-fit gap-1.5 text-fuchsia-500"
              >
                Поделиться <Share className="size-5" />
              </Button>

              <DotsDropdownMenu />
            </div>
          </div>
        )}

        {/* Back Button & "Chats" Text */}
        {matchesRoute(pathname, backbtnChatsText) && (
          <div className="container mt-4 flex items-center">
            <BackButton variant="router" />
            <h1 className="mx-auto -translate-x-5">Чаты</h1>
          </div>
        )}

        {/* Back Button, UserInfo, Call Button & 3 Dots */}
        {/* {matchesRoute(pathname, backbtnUserInfoCallbtnDots) && (
            <div>Back Button, UserInfo, Call Button & 3 Dots</div>
          )} */}
      </nav>
    </header>
  );
};

export default Header;
