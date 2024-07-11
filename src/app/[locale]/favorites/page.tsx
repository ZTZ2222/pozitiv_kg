import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getLocale, getTranslations } from "next-intl/server";
import AdList from "@/components/ads/AdList";
import SavedSearchList from "@/components/favorites/SavedSearchList";
import { getFavorites, getSavedSeaches } from "@/actions/favorite-actions";

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
      <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-0 md:w-[50%] lg:w-[40%] xl:w-[33%]">
        <TabsTrigger value="promotions">{t("tab-1")}</TabsTrigger>
        <TabsTrigger value="saved-searches">{t("tab-2")}</TabsTrigger>
      </TabsList>
      <TabsContent value="promotions">
        {favorites && favorites.length > 0 ? (
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
  );
};

export default Favorites;
