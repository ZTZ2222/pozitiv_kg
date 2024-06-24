"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LocaleSwitcher from "@/components/navigation/LocaleSwitcher";
import BreadCrumbs from "./BreadCrumbs";

const Header = () => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  if (isSmallScreen) {
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
        <nav>
          <BreadCrumbs />
        </nav>
      </header>
    );
  }

  return <header>Desktop View</header>;
};

export default Header;
