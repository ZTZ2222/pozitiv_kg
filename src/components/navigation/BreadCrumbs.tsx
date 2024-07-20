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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface BreadCrumbsProps {
  path: (string | { [key: string]: string })[];
  className?: string;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ path, className }) => {
  const t = useTranslations("Breadcrumbs");

  const constructHref = (
    path: (string | { [key: string]: string })[],
    index: number,
  ) => {
    return (
      "/" +
      path
        .slice(0, index + 1)
        .map((part) => {
          if (typeof part === "object" && part !== null) {
            return Object.values(part)[0];
          }
          return part;
        })
        .join("/")
    );
  };

  return (
    <Breadcrumb className={cn("mb-[50px] mt-7 hidden lg:block", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{t("home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {path.map((part, index) => {
          const isLast = index === path.length - 1;
          let label: string;

          // Determine if part is an object or a string
          if (typeof part === "object" && part !== null) {
            const key = Object.keys(part)[0];
            label = part[key];
          } else {
            label = t(part as string);
          }

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={constructHref(path, index)} prefetch>
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
