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

  // Create breadcrumb links from the parts
  const breadcrumbLinks = parts.map((part, index) => {
    const isNumeric = !isNaN(Number(part));
    const matchesPattern = chatIdPattern.test(part);
    return {
      label: isNumeric || matchesPattern ? part : t(part),
      href: `/${parts.slice(0, index + 1).join("/")}`,
    };
  });

  return (
    <Breadcrumb className={cn("container mt-7 py-1", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{t("home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbLinks.length > 0 && <BreadcrumbSeparator />}
        {breadcrumbLinks.map((link, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === breadcrumbLinks.length - 1 ? (
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={link.href}>{link.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
