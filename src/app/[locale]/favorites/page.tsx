import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import AdList from "@/components/ads/AdList";
import { zPromotionRead } from "@/types/ad.schema";

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
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data.items;
};

const Favorites = async () => {
  const favorites = await getFavorites();

  return (
    <Tabs defaultValue="promotions" className="container mb-[100px] mt-[30px]">
      <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-0">
        <TabsTrigger value="promotions">Объявления</TabsTrigger>
        <TabsTrigger value="saved-searches">Поиски</TabsTrigger>
      </TabsList>
      <TabsContent value="promotions">
        {favorites.length > 0 ? (
          <AdList ads={favorites} />
        ) : (
          <div className="mx-auto my-[100px] max-w-[300px] space-y-6 text-center">
            <h3 className="text-xl font-medium">Нет избранных</h3>
            <p className="font-light text-gray-500">
              Добавляйте объявления в избранное, чтобы посмотреть их позже
            </p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="saved-searches">
        <div>Saved searches</div>
      </TabsContent>
    </Tabs>
  );
};

export default Favorites;
