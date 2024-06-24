"use client";

import { setAccessToken } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Ban, ChevronRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="container mb-24 mt-14 flex flex-col items-center gap-12 text-lg text-gray-800">
      {/* Logo */}
      <div className="relative size-[100px] md:size-[155px]">
        <Image
          src="/assets/auth/pozitiv-logo.png"
          alt="Logo Pozitiv.KG"
          fill
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>
      {/* Google Sign-in Button */}
      <Link
        href="#"
        className="flex gap-2.5 rounded-[30px] border px-10 py-4 shadow-md"
      >
        <div className="relative size-6">
          <Image
            src="/assets/auth/google-logo.png"
            alt="Logo Google"
            fill
            className="object-cover"
            sizes="(max-width: 600px) 100vw, 50vw"
          />
        </div>
        <p>Вход с помощью Google</p>
      </Link>
      {/* Mock Login Button */}
      <Button
        onClick={async () => {
          await setAccessToken();
        }}
        className="gap-2.5"
      >
        <Ban />
        Mock Login
      </Button>
      {/* Terms */}
      <p className="mt-10 max-w-[350px] text-center md:max-w-[460px]">
        Подтверждая, Вы соглашаетесь с{" "}
        <Link href="#" className="text-blue-500 hover:underline">
          политикой конфиденциальности
        </Link>{" "}
        Позитив KG
      </p>
      {/* Skip Button */}
      <Link
        href="/"
        className="mt-5 flex items-center gap-2.5 rounded-md px-4 py-2.5 hover:bg-gray-100"
      >
        <p>Пропустить сейчас</p>
        <ChevronRight className="size-5" />
      </Link>
    </div>
  );
};

export default LoginPage;
