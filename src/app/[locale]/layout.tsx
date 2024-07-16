import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProvider from "@/components/providers/ProgressBarProvider";

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
  const messages = useMessages();

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-[calc(100vh-192px)] bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <ProgressBarProvider>{children}</ProgressBarProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
