import React from "react";
import Link from "next/link";
import BackButton from "@/components/navigation/BackButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn, getInitials, getRandomColor } from "@/lib/utils";
import { getUserInfo } from "@/actions/user-actions";
import { User, UserRoundCog } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zPromotionRead } from "@/types/ad.schema";
import UserForm from "@/components/profile/UserForm";
import AdCard from "@/components/ads/AdCard";
import { getMyAds } from "@/actions/ads-actions";
import { getLocale, getTranslations } from "next-intl/server";

const Profile = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "ProfilePage",
  });

  // fetch from API
  const myPromotions = await getMyAds();
  const userInfo = await getUserInfo();

  const initials = getInitials(userInfo.name || "Annonymous");
  const bgColor = getRandomColor();
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
          <Avatar className="mx-auto size-[100px]">
            <AvatarImage src={userInfo.image} />
            <AvatarFallback className={cn("text-4xl font-medium", bgColor)}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="mt-[30px]">
            <span className="font-semibold">Имя</span>
            <Link
              href="/profile/edit"
              className="mt-2.5 flex gap-2 rounded-[10px] border border-black/25 p-2.5 text-black/25"
            >
              <User className="size-6" />
              <span>{userInfo.name}</span>
            </Link>
          </div>
        </div>
        <UserForm
          name={userInfo.name}
          phone={userInfo.phone}
          email={userInfo.email}
          className="hidden rounded-[10px] border border-gray-500 px-7 py-10 lg:block"
        />
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
            {myPromotions.length > 0 ? (
              <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {myPromotions.map((ad: zPromotionRead) => (
                  <AdCard key={ad.id} {...ad} />
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
            {myPromotions.length > 0 ? (
              <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {myPromotions.map((ad: zPromotionRead) => (
                  <AdCard key={ad.id} {...ad} />
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
            {myPromotions.length > 0 ? (
              <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {myPromotions.map((ad: zPromotionRead) => (
                  <AdCard key={ad.id} {...ad} />
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
