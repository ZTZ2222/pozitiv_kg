import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getLocale, getTranslations } from "next-intl/server";
import SavedSearchList from "@/components/favorites/SavedSearchList";
import { getFavorites, getSavedSeaches } from "@/actions/favorite-actions";
import { isAuthenticated } from "@/actions/user-actions";
import { redirect } from "@/lib/i18nNavigation";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import { zPromotionRead } from "@/types/ad.schema";
import AdCard from "@/components/ads/AdCard";

const Favorites = async () => {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    redirect("/login");
  }

  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "FavoritesPage",
  });

  const favorites = await getFavorites();

  const savedSearches = await getSavedSeaches();

  return (
    <>
      <BreadCrumbs path={["favorites"]} className="container" />

      <Tabs
        defaultValue="promotions"
        className="container mb-[100px] mt-[30px]"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-0 md:w-[50%] lg:w-[40%] xl:w-[33%]">
          <TabsTrigger value="promotions">{t("tab-1")}</TabsTrigger>
          <TabsTrigger value="saved-searches">{t("tab-2")}</TabsTrigger>
        </TabsList>
        <TabsContent value="promotions">
          {favorites && favorites.length > 0 ? (
            <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
              {favorites?.map((ad: zPromotionRead) => (
                <AdCard key={ad.id} {...ad} />
              ))}
            </div>
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
          {savedSearches && savedSearches.length > 0 ? (
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
    </>
  );
};

export default Favorites;
