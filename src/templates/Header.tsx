import Search from "@/components/Search";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex h-16 flex-col justify-between bg-gradient-to-r from-[#25CAD4] to-[#F809F3]">
      <div className="relative h-4 w-full">
        <Image
          src="/assets/ornament-up.png"
          alt="Ornaments"
          fill
          className="object-contain"
        />
      </div>
      <div className="container flex md:justify-between">
        <Link href="/" className="relative h-4 w-[120px]">
          <Image
            src="/assets/logo/pozitiv.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </Link>
        <Search className="hidden md:flex" />
      </div>
      <div className="relative h-4 w-full self-end">
        <Image
          src="/assets/ornament-down.png"
          alt="Ornaments"
          fill
          className="object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
