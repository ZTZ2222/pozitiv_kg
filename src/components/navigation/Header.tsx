"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { zCategoryRead } from "@/types/category.schema";
import { getCategories } from "@/actions/category-actions";
import { ChevronLeft } from "lucide-react";
import { Chat, Heart, PlusCircle, UserCircle } from "@/components/icons";
import { cn, checkRoute } from "@/lib/utils";
import { usePathname, useRouter } from "@/lib/i18nNavigation";
import useMediaQuery from "@/hooks/useMediaQuery";
import Search from "./Search";
import LoginButton from "./LoginButton";
import MainFilter from "@/components/filter/MainFilter";
import LocaleSwitcher from "@/components/navigation/LocaleSwitcher";
import CategoryModal from "@/components/category/CategoryModal";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type Props = {
  isAuthenticated: boolean;
};

const Header: React.FC<Props> = ({ isAuthenticated }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isWideScreen = useMediaQuery("(min-width: 1536px)");
  const isMobile = useMediaQuery("(max-width: 480px)");

  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");

  const searchFilterRoutes = ["/", "/favorites"];
  const backbtnSearchFilterRoutes = [
    /^\/category\/[^/]+$/,
    "/search",
    /^\/commercial\/[^/]+$/,
  ];
  const backbtnChatsText = ["/chat"];

  const [categories, setCategories] = useState<zCategoryRead[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  if (isDesktop) {
    return (
      <header className="fixed top-0 z-50 w-full bg-white shadow-[0px_0px_4px_0px_#9090904D]">
        <div className="bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          <div className="flex flex-col justify-between bg-gradient-to-r from-cyan-400 to-fuchsia-500">
            {/* Ornaments */}
            <div className="flex overflow-hidden">
              {Array.from({ length: isWideScreen ? 5 : 4 }).map((_, index) => (
                <div key={index} className="relative h-4 w-full">
                  <Image
                    src="/assets/ornament-up.png"
                    alt="Ornaments"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
            {/* Logo */}
            <div className="container flex items-center justify-between py-1">
              <Link href="/" className="relative h-[26px] w-[200px]">
                <Image
                  src="/assets/logo/pozitiv.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </Link>
              <Search />
            </div>
            {/* Ornaments */}
            <div className="flex overflow-hidden">
              {Array.from({ length: isWideScreen ? 5 : 4 }).map((_, index) => (
                <div key={index} className="relative h-4 w-full">
                  <Image
                    src="/assets/ornament-down.png"
                    alt="Ornaments"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {isAuthenticated ? (
          <nav className="container flex items-center justify-between bg-white px-4 py-2.5">
            <CategoryModal
              categories={categories || []}
              className="hover:bg-inherit"
            />
            <div className="flex items-center gap-3.5 text-fuchsia-500">
              <LocaleSwitcher />

              {/* /ads/post */}
              <Link
                href="/ads/post"
                className="group flex gap-2 rounded-[10px] px-2 py-1 hover:bg-accent hover:text-accent-foreground"
              >
                <PlusCircle className="group-hover:bg-accent-foreground" />
                <span className="text-xs xs:text-sm sm:text-base">
                  {t("post-ad")}
                </span>
              </Link>

              {/* /favorites */}
              <Link
                href="/favorites"
                className="group flex gap-2 rounded-[10px] px-2 py-1 hover:bg-accent hover:text-accent-foreground"
              >
                <Heart className="size-6 fill-fuchsia-500 group-hover:fill-accent-foreground" />
                <span>{t("favorites")}</span>
              </Link>

              {/* /chat */}
              <Link
                href="/chat"
                className="group flex gap-2 rounded-[10px] px-2 py-1 hover:bg-accent hover:text-accent-foreground"
              >
                <Chat className="size-6 fill-fuchsia-500 group-hover:fill-accent-foreground" />
                <span>{t("chats")}</span>
              </Link>

              {/* /profile */}
              <Link
                href="/profile"
                className="group flex gap-2 rounded-[10px] px-2 py-1 hover:bg-accent hover:text-accent-foreground"
              >
                <UserCircle className="size-6 fill-fuchsia-500 group-hover:fill-accent-foreground" />
                <span>{t("profile")}</span>
              </Link>
            </div>
          </nav>
        ) : (
          <nav className="container flex items-center justify-between bg-white px-4 py-2.5">
            <CategoryModal
              categories={categories || []}
              className="hover:bg-inherit"
            />
            <div className="flex items-center space-x-4">
              <LocaleSwitcher />
              <LoginButton />
            </div>
          </nav>
        )}
      </header>
    );
  }

  return (
    <header>
      <div className="flex h-16 flex-col justify-between bg-gradient-to-r from-cyan-400 to-fuchsia-500">
        {/* Ornaments */}
        <div className="flex overflow-hidden">
          {Array.from({ length: isMobile ? 1 : 2 }).map((_, index) => (
            <div key={index} className="relative h-4 w-full">
              <Image
                src="/assets/ornament-up.png"
                alt="Ornaments"
                fill
                className="object-contain"
                sizes="(max-width: 600px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
        {/* Logo */}
        <div className="container flex items-center justify-between">
          <Link href="/" className="relative h-4 w-[120px]">
            <Image
              src="/assets/logo/pozitiv.png"
              alt="Logo"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </Link>
          <LocaleSwitcher className="h-fit p-0 text-white/80 hover:bg-transparent hover:text-accent-foreground" />
        </div>
        {/* Ornaments */}
        <div className="flex overflow-hidden">
          {Array.from({ length: isMobile ? 1 : 2 }).map((_, index) => (
            <div key={index} className="relative h-4 w-full">
              <Image
                src="/assets/ornament-down.png"
                alt="Ornaments"
                fill
                className="object-contain"
                sizes="(max-width: 600px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
      <nav className="container">
        {/* Search & Filter */}
        {checkRoute(pathname, searchFilterRoutes) && (
          <div
            className={cn(
              "flex items-center justify-between gap-[18px] py-1.5 shadow-sm lg:hidden",
            )}
          >
            <Search />
            <MainFilter />
          </div>
        )}

        {/* Back Button, Search & Filter */}
        {checkRoute(pathname, backbtnSearchFilterRoutes) && (
          <div
            className={cn(
              "mt-1 flex items-center justify-between gap-2 py-1.5 lg:hidden",
              // "hidden",
            )}
          >
            <Button
              className="flex h-fit w-fit shrink-0 justify-start p-1"
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Search />
            <MainFilter />
          </div>
        )}

        {/* Back Button & "Chats" Text */}
        {checkRoute(pathname, backbtnChatsText) && (
          <div className="mt-4 flex items-center pb-5">
            <Button
              className="flex h-fit w-fit shrink-0 justify-start p-1"
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="mx-auto -translate-x-5">{t("chats")}</h1>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
