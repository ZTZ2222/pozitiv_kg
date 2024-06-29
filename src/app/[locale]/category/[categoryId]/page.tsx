import { getAds } from "@/actions/ads-actions";
import { getCategoryById } from "@/actions/category-actions";
import AdList from "@/components/ads/AdList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

type Props = {
  params: { categoryId: string };
};

const CategoryPromotionList: React.FC<Props> = async ({
  params: { categoryId },
}) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "CategoryPromotionsPage",
  });
  const category = await getCategoryById({ id: categoryId });
  const promotions = await getAds({
    sort_by: "latest",
    category_id: categoryId,
  });

  return (
    <main>
      <ScrollArea className="ml-4 mt-10">
        <div className="mr-4 flex gap-4">
          {category.childs?.map((child) => (
            <Link
              key={child.id}
              href={`/category/${child.id}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] border border-input bg-background px-3.5 py-2.5 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {child.name}
            </Link>
          ))}
        </div>
        <ScrollBar className="hidden h-1.5 md:flex" orientation="horizontal" />
      </ScrollArea>
      {promotions.length > 0 ? (
        <AdList ads={promotions} className="container mb-10" />
      ) : (
        <>
          <div className="container flex h-[50vh] flex-col items-center justify-center gap-10">
            <div className="flex max-w-[260px] flex-col items-center gap-5 text-center">
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.6859 43.9742C25.7537 43.9742 30.6727 40.0249 30.6727 35.1531C30.6727 30.2814 25.7537 26.332 19.6859 26.332C13.6181 26.332 8.69922 30.2814 8.69922 35.1531C8.69922 40.0249 13.6181 43.9742 19.6859 43.9742Z"
                  fill="white"
                />
                <path
                  d="M19.6754 26.0258C9.37775 26.0258 6.01994 37.6195 7.46916 37.6195C7.89025 37.6195 8.22931 36.925 8.74885 35.9406C8.83088 36.6953 9.03322 37.4226 9.33947 38.1117C10.6793 40.7203 13.3973 42.5031 16.5309 42.5031C20.9988 42.5031 24.6192 38.8828 24.6192 34.4148C24.6192 32.6758 24.0668 31.0625 23.1317 29.7445C30.0879 31.3359 30.5527 37.6195 31.8817 37.6195C33.4074 37.6195 29.9731 26.0258 19.6754 26.0258ZM22.4535 32.982C22.2731 33.8898 21.2559 34.4586 20.184 34.2453C19.1067 34.032 18.3848 33.1242 18.5653 32.2164C18.7457 31.3086 19.7629 30.7398 20.8348 30.9531C21.9067 31.1664 22.634 32.0742 22.4535 32.982Z"
                  fill="url(#paint0_linear_1379_18374)"
                />
                <path
                  d="M50.3109 43.9742C56.3787 43.9742 61.2977 40.0249 61.2977 35.1531C61.2977 30.2814 56.3787 26.332 50.3109 26.332C44.2431 26.332 39.3242 30.2814 39.3242 35.1531C39.3242 40.0249 44.2431 43.9742 50.3109 43.9742Z"
                  fill="white"
                />
                <path
                  d="M50.3004 26.0258C40.0028 26.0258 36.6449 37.6195 38.0942 37.6195C38.5153 37.6195 38.8543 36.925 39.3738 35.9406C39.4559 36.6953 39.6582 37.4226 39.9645 38.1117C41.3043 40.7203 44.0223 42.5031 47.1559 42.5031C51.6238 42.5031 55.2442 38.8828 55.2442 34.4148C55.2442 32.6758 54.6918 31.0625 53.7567 29.7445C60.7129 31.3359 61.1777 37.6195 62.5067 37.6195C64.0324 37.6195 60.5981 26.0258 50.3004 26.0258ZM53.0785 32.982C52.8981 33.8898 51.8809 34.4586 50.809 34.2453C49.7317 34.032 49.0098 33.1242 49.1902 32.2164C49.3707 31.3086 50.3879 30.7398 51.4598 30.9531C52.5317 31.1664 53.259 32.0742 53.0785 32.982Z"
                  fill="url(#paint1_linear_1379_18374)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1379_18374"
                    x1="19.6877"
                    y1="26.0258"
                    x2="19.6877"
                    y2="42.5031"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#37E5F0" />
                    <stop offset="1" stop-color="#1EA69A" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1379_18374"
                    x1="50.3127"
                    y1="26.0258"
                    x2="50.3127"
                    y2="42.5031"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#37E5F0" />
                    <stop offset="1" stop-color="#1EA69A" />
                  </linearGradient>
                </defs>
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">
                {t("empty-message-title")}
              </h2>
              <p className="text-gray-600">{t("empty-message-description")}</p>
            </div>
            <Link
              className="flex h-[50px] w-full max-w-[358px] items-center justify-center rounded-[10px] bg-fuchsia-500 font-medium text-white"
              href="/"
            >
              {t("back-to-home")}
            </Link>
          </div>
        </>
      )}
    </main>
  );
};

export default CategoryPromotionList;
