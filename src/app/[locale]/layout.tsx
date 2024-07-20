import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProvider from "@/components/providers/ProgressBarProvider";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileNav from "@/components/navigation/MobileNav";
import { isAuthenticated } from "@/actions/user-actions";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    robots: t("robots"),
    author: t("author"),
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      url: "https://pozitiv.kg",
      siteName: t("og_site_name"),
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const isAuth = await isAuthenticated();

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-[calc(100vh-192px)] bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ProgressBarProvider>
            <Header isAuth={isAuth} />
            <div className="hidden lg:mt-48 lg:block" />
            {children}
            <Footer />
            <MobileNav />
          </ProgressBarProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
