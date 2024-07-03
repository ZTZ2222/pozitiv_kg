"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LocaleSwitcher from "@/components/navigation/LocaleSwitcher";
import Search from "./Search";
import MainFilter from "../filter/MainFilter";
import { cn, matchesRoute } from "@/lib/utils";
import { usePathname, useRouter } from "@/lib/i18nNavigation";
import BackButton from "./BackButton";
import { Button } from "../ui/button";
import { ChevronLeft, Grip, Share, UserIcon } from "lucide-react";

import DotsDropdownMenu from "./DotsDropdownMenu";
import LoginButton from "./LoginButton";
import { zCategoryRead } from "@/types/category.schema";
import { getCategories } from "@/actions/category-actions";
import CategoryModal from "../category/CategoryModal";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const isWideScreen = useMediaQuery("(min-width: 1441px)");
  const isMobile = useMediaQuery("(max-width: 480px)");

  const pathname = usePathname();
  const router = useRouter();

  const searchFilterRoutes = ["/", "/favorites"];
  const backbtnSearchFilterRoutes = [/^\/category\/[^/]+$/, "/search"];
  const backbtnShareDotsRoutes = [/^\/ads\/\d+$/];
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
      <header>
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
                    sizes="(max-width: 600px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
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
                    sizes="(max-width: 600px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <nav className="container flex items-center justify-between bg-white p-4">
          <CategoryModal
            categories={categories || []}
            className="hover:bg-inherit"
          />
          <div className="flex items-center space-x-4">
            <LocaleSwitcher />
            <LoginButton />
          </div>
        </nav>
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
                sizes="(max-width: 600px) 100vw, 50vw"
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
            />
          </Link>
          <LocaleSwitcher className="h-fit p-0 text-white/80" />
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
                sizes="(max-width: 600px) 100vw, 50vw"
              />
            </div>
          ))}
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

        {/* Back Button, Search & Filter */}
        {matchesRoute(pathname, backbtnSearchFilterRoutes) && (
          <div
            className={cn(
              "flex items-center justify-between gap-2 py-1.5 md:hidden",
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

        {/* Back Button, Share & Dots */}
        {matchesRoute(pathname, backbtnShareDotsRoutes) && (
          <div className="mt-[30px] flex justify-between">
            <Button
              className="flex h-fit w-fit shrink-0 justify-start p-1"
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
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
      </nav>
    </header>
  );
};

export default Header;
