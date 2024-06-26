import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { AllLocales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileNav from "@/components/navigation/MobileNav";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pozitiv App",
  description: "Pozitiv App",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!AllLocales.includes(params.locale)) notFound();

  const messages = useMessages();

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          <MobileNav />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
