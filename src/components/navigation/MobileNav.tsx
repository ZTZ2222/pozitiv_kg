"use client";

import React from "react";
import { usePathname } from "@/lib/i18nNavigation";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";
import { chatRouteRegex, cn } from "@/lib/utils";
import { Chat, Heart, Home, PlusCircle, UserCircle } from "@/components/icons";

const MobileNavButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex w-full flex-col items-center justify-center transition-colors ease-in-out",
        "gap-1 pb-4 pt-3 sm:gap-2 sm:pb-6",
        "fill-gray-400 text-gray-400 focus:fill-fuchsia-500 focus:text-fuchsia-500",
        "text-xs xs:text-sm sm:text-base",
        pathname === href && "fill-fuchsia-500 text-fuchsia-500",
      )}
    >
      {children}
    </Link>
  );
};

const MobileNav = () => {
  const pathname = usePathname();
  const isMobileView = useMediaQuery("(max-width: 768px)");

  if (!isMobileView || chatRouteRegex.test(pathname)) return null;
  return (
    <nav className="fixed bottom-0 left-0 z-20 flex w-full max-w-3xl border-t border-gray-200 bg-white px-1 shadow sm:px-0">
      <MobileNavButton href="/">
        <Home className="size-5 sm:size-7" />
        <span>Главная</span>
      </MobileNavButton>
      <MobileNavButton href="/favorites">
        <Heart className="size-5 sm:size-7" />
        <span>Избранные</span>
      </MobileNavButton>
      <Link
        href="/ads/post"
        className={cn(
          "group flex w-full -translate-y-3 flex-col items-center justify-center gap-1 text-gray-400 focus:text-fuchsia-500 sm:gap-2",
          pathname === "/ads/post" && "fill-fuchsia-500 text-fuchsia-500",
        )}
      >
        <PlusCircle className="size-12 p-4 sm:size-16" />

        <span className="text-xs xs:text-sm sm:text-base">Подать</span>
      </Link>
      <MobileNavButton href="/chat">
        <Chat className="size-5 sm:size-7" />
        <span>Чаты</span>
      </MobileNavButton>
      <MobileNavButton href="/profile">
        <UserCircle className="size-5 sm:size-7" />
        <span>Профиль</span>
      </MobileNavButton>
    </nav>
  );
};

export default MobileNav;
