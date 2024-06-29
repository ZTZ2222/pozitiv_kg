import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cookies } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import AdList from "@/components/ads/AdList";
import { zPromotionRead } from "@/types/ad.schema";
import SavedSearchList from "@/components/favorites/SavedSearchList";
import { zSearchRead } from "@/types/other.schema";
import { redirect } from "@/lib/i18nNavigation";

const getFavorites = async (): Promise<zPromotionRead[]> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/fevourites`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: ["favorites"] },
    },
  );
  if (response.status === 401) {
    redirect("/login");
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data.items;
};

const getSavedSeaches = async (): Promise<zSearchRead[]> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/search-list`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: ["saved-searches"] },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data.items;
};

const Favorites = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "FavoritesPage",
  });

  const favorites = await getFavorites();

  const savedSearches = await getSavedSeaches();

  return (
    <Tabs defaultValue="promotions" className="container mb-[100px] mt-[30px]">
      <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-0">
        <TabsTrigger value="promotions">{t("tab-1")}</TabsTrigger>
        <TabsTrigger value="saved-searches">{t("tab-2")}</TabsTrigger>
      </TabsList>
      <TabsContent value="promotions">
        {favorites.length > 0 ? (
          <AdList ads={favorites} />
        ) : (
          <div className="mx-auto my-[140px] max-w-[300px] space-y-6 text-center">
            <h3 className="text-xl font-medium">{t("tab-1-empty-title")}</h3>
            <p className="font-light text-gray-500">
              {t("tab-1-empty-description")}
            </p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="saved-searches">
        {savedSearches.length > 0 ? (
          <SavedSearchList savedSearches={savedSearches} />
        ) : (
          <div className="mx-auto my-[140px] max-w-[300px] space-y-6 text-center">
            <h3 className="text-xl font-medium">{t("tab-2-empty-title")}</h3>
            <p className="font-light text-gray-500">
              {t("tab-2-empty-description")}
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default Favorites;
