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
// import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/i18nNavigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BreadCrumbs = ({ className }: { className?: string }) => {
  //   const t = useTranslations("Navigation");
  const pathname = usePathname();

  // Split the pathname into parts
  const parts = pathname.split("/").filter((part) => part !== "");

  // Create breadcrumb links from the parts
  const breadcrumbLinks = parts.map((part, index) => ({
    label: part.charAt(0).toUpperCase() + part.slice(1),
    href: `/${parts.slice(0, index + 1).join("/")}`,
  }));

  return (
    <Breadcrumb className={cn("container mt-7 py-1", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Главная</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
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
