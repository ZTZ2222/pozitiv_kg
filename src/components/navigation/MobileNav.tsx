"use client";

import React from "react";
import { usePathname } from "@/lib/i18nNavigation";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";
import { chatRouteRegex, cn } from "@/lib/utils";

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
        <svg
          viewBox="0 0 20 21"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 sm:size-7"
        >
          <path d="M19.71 9.28994L10.71 0.289939C10.6171 0.196211 10.5065 0.121816 10.3846 0.0710475C10.2627 0.0202789 10.132 -0.00585937 10 -0.00585937C9.86801 -0.00585938 9.7373 0.0202789 9.61544 0.0710475C9.49358 0.121816 9.38298 0.196211 9.29002 0.289939L0.290017 9.28994C0.15126 9.43056 0.0572635 9.60914 0.0198894 9.80313C-0.0174847 9.99712 0.00343795 10.1978 0.0800174 10.3799C0.155037 10.5626 0.282435 10.7189 0.446156 10.8292C0.609876 10.9396 0.802592 10.999 1.00002 10.9999H2.00002V19.9999C2.00002 20.2652 2.10537 20.5195 2.29291 20.707C2.48045 20.8946 2.7348 20.9999 3.00002 20.9999H6.00002C6.26523 20.9999 6.51959 20.8946 6.70712 20.707C6.89466 20.5195 7.00002 20.2652 7.00002 19.9999V13.9999C7.00002 13.7347 7.10537 13.4804 7.29291 13.2928C7.48045 13.1053 7.7348 12.9999 8.00002 12.9999H12C12.2652 12.9999 12.5196 13.1053 12.7071 13.2928C12.8947 13.4804 13 13.7347 13 13.9999V19.9999C13 20.2652 13.1054 20.5195 13.2929 20.707C13.4804 20.8946 13.7348 20.9999 14 20.9999H17C17.2652 20.9999 17.5196 20.8946 17.7071 20.707C17.8947 20.5195 18 20.2652 18 19.9999V10.9999H19C19.1974 10.999 19.3902 10.9396 19.5539 10.8292C19.7176 10.7189 19.845 10.5626 19.92 10.3799C19.9966 10.1978 20.0175 9.99712 19.9801 9.80313C19.9428 9.60914 19.8488 9.43056 19.71 9.28994Z" />
        </svg>

        <span>Главная</span>
      </MobileNavButton>
      <MobileNavButton href="/favorites">
        <svg
          viewBox="0 0 20 18"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 sm:size-7"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.61186 12.6348C4.61419 12.6365 4.61642 12.6383 4.61853 12.6402C5.94951 13.711 7.60328 15.2154 9.84063 17.2956C9.88394 17.336 9.94099 17.3585 10.0002 17.3585C10.0595 17.3585 10.1166 17.336 10.1599 17.2956C12.3963 15.2152 14.0505 13.711 15.3802 12.6402C15.3826 12.6387 15.3849 12.6369 15.3869 12.6348C16.6214 11.5677 18.1591 10.1334 19.0972 8.50473C20.1666 6.64954 20.2864 4.82925 19.4543 3.09545C19.0376 2.22794 18.399 1.48605 17.6031 0.945009C16.8072 0.403973 15.8824 0.0830373 14.9225 0.0147539C13.9625 -0.0535296 13.0016 0.133268 12.1372 0.5562C11.2727 0.979133 10.5355 1.62316 10.0002 2.42295C9.46511 1.62288 8.72785 0.978595 7.86329 0.555477C6.99873 0.132359 6.03764 -0.0545378 5.07752 0.0137519C4.1174 0.0820416 3.19243 0.403087 2.39646 0.944313C1.60049 1.48554 0.961846 2.22768 0.545334 3.09545C-0.286556 4.82948 -0.166064 6.64954 0.902588 8.50473C1.84141 10.1334 3.37736 11.5677 4.61186 12.6348Z"
          />
        </svg>

        <span>Избранные</span>
      </MobileNavButton>
      <Link
        href="/ads/post"
        className={cn(
          "group flex w-full -translate-y-3 flex-col items-center justify-center gap-1 text-gray-400 focus:text-fuchsia-500 sm:gap-2",
          pathname === "/ads/post" && "fill-fuchsia-500 text-fuchsia-500",
        )}
      >
        <div className="grid size-12 place-content-center rounded-full bg-fuchsia-500 group-focus:outline group-focus:outline-offset-1 group-focus:outline-gray-400 sm:size-16">
          <svg
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
            className="size-[14px] fill-white sm:size-5"
          >
            <path d="M6 6V1C6 0.447715 6.44772 0 7 0C7.55228 0 8 0.447715 8 1V6H13C13.5523 6 14 6.44772 14 7C14 7.55228 13.5523 8 13 8H8V13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13V8H1C0.447715 8 0 7.55228 0 7C0 6.44772 0.447715 6 1 6H6Z" />
          </svg>
        </div>

        <span className="text-xs xs:text-sm sm:text-base">Подать</span>
      </Link>
      <MobileNavButton href="/chat">
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 sm:size-7"
        >
          <path d="M5.29117 18.8242L0 20L1.17581 14.7088C0.42544 13.3056 0 11.7025 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C8.2975 20 6.6944 19.5746 5.29117 18.8242Z" />
        </svg>

        <span>Чаты</span>
      </MobileNavButton>
      <MobileNavButton href="/profile">
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 sm:size-7"
        >
          <path d="M10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0ZM4.02332 13.4163C5.49083 15.6069 7.69511 17 10.1597 17C12.6243 17 14.8286 15.6069 16.2961 13.4163C14.6885 11.9172 12.5312 11 10.1597 11C7.78821 11 5.63095 11.9172 4.02332 13.4163ZM10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.3431 3 7 4.34315 7 6C7 7.65685 8.3431 9 10 9Z" />
        </svg>

        <span>Профиль</span>
      </MobileNavButton>
    </nav>
  );
};

export default MobileNav;
