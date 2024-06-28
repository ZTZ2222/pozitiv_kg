import React from "react";
import Link from "next/link";
import BackButton from "@/components/navigation/BackButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn, getInitials, getRandomColor } from "@/lib/utils";
import { getUserInfo } from "@/actions/user-actions";
import { User, UserRoundCog } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zPromotionRead } from "@/types/ad.schema";
import AdList from "@/components/ads/AdList";

const colors = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
  "bg-teal-200",
  // Add more colors as needed
];

const Profile = async () => {
  const myPromotions: zPromotionRead[] = [];

  const userInfo = await getUserInfo();

  const initials = getInitials(userInfo.name || "Annonymous");
  const bgColor = getRandomColor(colors);
  return (
    <div className="container">
      <div className="mt-[30px] flex items-center justify-between">
        <BackButton variant="router" />
        <Link href="/profile/edit">
          <UserRoundCog className="size-5" />
        </Link>
      </div>
      <div className="my-[30px]">
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
        <Tabs defaultValue="active" className="mt-[30px] space-y-5">
          <h4 className="font-semibold">Ваши объявления</h4>
          <TabsList className="w-full justify-between gap-1 bg-inherit p-0">
            <TabsTrigger variant="borderBottom" value="active">
              Активные
            </TabsTrigger>
            <TabsTrigger variant="borderBottom" value="in-moderation">
              На модерации
            </TabsTrigger>
            <TabsTrigger variant="borderBottom" value="deactivated">
              Деактивировано
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {myPromotions.length > 0 ? (
              <AdList ads={myPromotions} />
            ) : (
              <div className="mx-auto my-[100px] max-w-[300px] space-y-6 text-center">
                <h3 className="text-xl font-medium">Нет активных объявлений</h3>
                <p className="font-light text-gray-500">
                  Размещайте объявления для успешных покупок и продаж!
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="in-moderation">
            {myPromotions.length > 0 ? (
              <AdList ads={myPromotions} />
            ) : (
              <div className="mx-auto my-[100px] max-w-[300px] space-y-6 text-center">
                <h3 className="text-xl font-medium">Нет объявлений</h3>
                <p className="font-light text-gray-500">
                  В этом разделе вы увидите объявления, проходящие модерацию.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="deactivated">
            {myPromotions.length > 0 ? (
              <AdList ads={myPromotions} />
            ) : (
              <div className="mx-auto my-[100px] max-w-[300px] space-y-6 text-center">
                <h3 className="text-xl font-medium">Нет объявлений</h3>
                <p className="font-light text-gray-500">
                  Здесь вы увидите свои деактивированные объявления.
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
