import React from "react";
import Link from "next/link";
import BackButton from "@/components/navigation/BackButton";
import { getUserInfo } from "@/actions/user-actions";
import { User, UserRoundCog } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zPromotionRead } from "@/types/ad.schema";
import UserForm from "@/components/profile/UserForm";
import AdCard from "@/components/ads/AdCard";
import { getMyAds } from "@/actions/ads-actions";
import { getLocale, getTranslations } from "next-intl/server";
import UserImageUpload from "@/components/profile/UserImageUpload";
import DotsDropdownMenu from "@/components/navigation/DotsDropdownMenu";

const Profile = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "ProfilePage",
  });

  // fetch from API
  const myActivePromotions = await getMyAds("active");
  const myPendingPromotions = await getMyAds("pending");
  const myCancelledPromotions = await getMyAds("cancelled");
  const userInfo = await getUserInfo();

  return (
    <div className="container">
      <div className="mt-[30px] flex items-center justify-between">
        <BackButton variant="router" />
        <Link href="/profile/edit" className="lg:hidden">
          <UserRoundCog className="size-5" />
        </Link>
      </div>
      <div className="my-[30px] lg:flex lg:gap-[50px]">
        <div className="lg:hidden">
          <UserImageUpload userInfo={userInfo} />
          <div className="mt-5">
            <span className="font-semibold">Имя</span>
            <Link
              href="/profile/edit"
              className="mt-2.5 flex gap-2 rounded-[10px] border border-black/25 p-2.5 text-black/25"
            >
              <User className="size-6" />
              <span>{userInfo?.name}</span>
            </Link>
          </div>
        </div>
        <div>
          <UserForm
            userInfo={userInfo}
            className="hidden rounded-[10px] border border-gray-500 px-7 py-10 lg:block"
          />
        </div>
        <Tabs
          defaultValue="active"
          className="mt-[30px] space-y-5 lg:mt-0 lg:w-full"
        >
          <h4 className="font-semibold lg:text-xl">{t("your-promotions")}</h4>
          <TabsList className="w-full justify-between gap-1 overflow-hidden bg-inherit p-0 lg:w-fit">
            <TabsTrigger
              variant="borderBottom"
              value="active"
              className="lg:text-base"
            >
              {t("tab-trigger-active")}
            </TabsTrigger>
            <TabsTrigger
              variant="borderBottom"
              value="in-moderation"
              className="lg:text-base"
            >
              {t("tab-trigger-in-moderation")}
            </TabsTrigger>
            <TabsTrigger
              variant="borderBottom"
              value="deactivated"
              className="lg:text-base"
            >
              {t("tab-trigger-deactivated")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {myActivePromotions && myActivePromotions.length > 0 ? (
              <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {myActivePromotions.map((ad: zPromotionRead) => (
                  <div className="relative">
                    <AdCard key={ad.id} {...ad} />
                    <DotsDropdownMenu
                      promotion={ad}
                      currentUser={userInfo}
                      editMode
                      className="absolute -right-1 top-0 hover:bg-transparent"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto my-[100px] max-w-[300px] space-y-6 text-center">
                <h3 className="text-xl font-medium">
                  {t("empty-active-message-title")}
                </h3>
                <p className="font-light text-gray-500">
                  {t("empty-active-message-description")}
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="in-moderation">
            {myPendingPromotions && myPendingPromotions.length > 0 ? (
              <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {myPendingPromotions.map((ad: zPromotionRead) => (
                  <div className="relative">
                    <AdCard key={ad.id} {...ad} />
                    <DotsDropdownMenu
                      promotion={ad}
                      currentUser={userInfo}
                      editMode
                      className="absolute -right-1 top-0 hover:bg-transparent"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto my-[100px] max-w-[300px] space-y-6 text-center">
                <h3 className="text-xl font-medium">
                  {t("empty-in-moderation-message-title")}
                </h3>
                <p className="font-light text-gray-500">
                  {t("empty-in-moderation-message-description")}
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="deactivated">
            {myCancelledPromotions && myCancelledPromotions.length > 0 ? (
              <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {myCancelledPromotions.map((ad: zPromotionRead) => (
                  <div className="relative">
                    <AdCard key={ad.id} {...ad} />
                    <DotsDropdownMenu
                      promotion={ad}
                      currentUser={userInfo}
                      editMode
                      className="absolute -right-1 top-0 hover:bg-transparent"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto my-[100px] max-w-[300px] space-y-6 text-center">
                <h3 className="text-xl font-medium">
                  {t("empty-deactivated-message-title")}
                </h3>
                <p className="font-light text-gray-500">
                  {t("empty-deactivated-message-description")}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
