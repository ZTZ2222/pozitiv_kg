import CategoriesButtonGroup from "@/components/category/CategoriesButtonGroup";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import SkCategoriesButtonGroup from "@/components/skeletons/SkCategoriesButtonGroup";
import Swiper from "@/components/Swiper";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { Suspense } from "react";

const Categories = () => {
  const t = useTranslations("CategoryPromotionsPage");
  return (
    <main className="min-h-screen">
      <BreadCrumbs path={["category"]} className="container" />
      <Swiper className="mt-[30px]" />
      <Suspense fallback={<SkCategoriesButtonGroup />}>
        <CategoriesButtonGroup />
      </Suspense>
      <section className="mt-[30px] bg-gray-100 py-8 text-center md:mt-[50px] lg:mt-[100px]">
        <h1 className="container text-3xl font-bold">
          {t("categories-title")}
        </h1>
        <p className="container mt-2 text-lg text-gray-600">
          {t("categories-description")}
        </p>
      </section>
      <section className="container py-8">
        <h2 className="my-5 text-center text-2xl font-semibold">
          {t("featured-categories")}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/category/59"
            className="rounded border bg-[#0279CF] p-4 shadow-md"
          >
            <h3 className="text-xl font-medium text-white">
              {t("category-title-1")}
            </h3>
            <p className="mt-2 text-gray-100">{t("category-description-1")}</p>
          </Link>
          <Link
            href="/category/58"
            className="rounded border bg-[#0DC2C2] p-4 shadow-md"
          >
            <h3 className="text-xl font-medium text-white">
              {t("category-title-2")}
            </h3>
            <p className="mt-2 text-gray-100">{t("category-description-1")}</p>
          </Link>
          <Link
            href="/category/61"
            className="rounded border bg-[#6C6C6C] p-4 shadow-md"
          >
            <h3 className="text-xl font-medium text-white">
              {t("category-title-3")}
            </h3>
            <p className="mt-2 text-gray-100">{t("category-description-1")}</p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Categories;
