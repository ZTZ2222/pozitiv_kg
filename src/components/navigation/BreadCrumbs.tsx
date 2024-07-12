"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/i18nNavigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const chatIdPattern = /^\d+_\d+$/;

const BreadCrumbs = ({ className }: { className?: string }) => {
  const t = useTranslations("Breadcrumbs");

  const pathname = usePathname();
  const parts = pathname.split("/").filter((part) => part);

  // Hide breadcrumbs on the home page
  if (parts.length === 0) {
    return <div className="hidden h-0 lg:mt-48 lg:block" />;
  }

  // Only display the home link and the last part of the breadcrumb
  const lastPart = parts[parts.length - 1];
  const isNumeric = !isNaN(Number(lastPart));
  const matchesPattern = chatIdPattern.test(lastPart);
  const label = isNumeric || matchesPattern ? lastPart : t(lastPart);

  return (
    <Breadcrumb className={cn("container mt-7 py-1", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{t("home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
