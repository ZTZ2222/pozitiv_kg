import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = async () => {
  const t = await getTranslations("LoginPage");
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  const options: RequestInit = {
    cache: "no-store",
  };
  const response = await fetch(endpoint, options);
  const redirect_uri = await response.text();

  return (
    <div className="container mb-24 mt-14 flex flex-col items-center gap-12 text-lg text-gray-800">
      {/* Logo */}
      <div className="relative size-[100px] md:size-[155px]">
        <Image
          src="/assets/auth/login-poz-logo.svg"
          alt="Logo Pozitiv.KG"
          fill
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>
      {/* Google Sign-in Button */}
      <Link
        // href="https://accounts.google.com/o/oauth2/auth?client_id=211675154564-j6cv8sqa148kvjlpe334jvod40cg7uf6.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fredirect&scope=openid+profile+email&response_type=code"
        href={redirect_uri}
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
        <p>{t("sign-in-with-google")}</p>
      </Link>
      {/* Terms */}
      <p className="mt-10 max-w-[350px] text-center md:max-w-[480px]">
        {t("confirm-agree")}{" "}
        <Link
          prefetch
          href="/resources/privacy"
          className="text-blue-500 hover:underline"
        >
          {t("privacy-policy")}
        </Link>{" "}
        {t("pozitiv-kg")}
      </p>
      {/* Skip Button */}
      <Link
        href="/"
        prefetch
        className="mt-5 flex items-center gap-2.5 rounded-md px-4 py-2.5 hover:bg-gray-100"
      >
        <p>{t("skip-now")}</p>
        <ChevronRight className="size-5" />
      </Link>
    </div>
  );
};

export default LoginPage;
