"use client";

import { cn, getInitials, getRandomColor } from "@/lib/utils";
import { zSellerRead } from "@/types/user.schema";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  seller: zSellerRead;
  className?: string;
};

const UserInfoCard: React.FC<Props> = ({ seller, className }) => {
  const t = useTranslations("ContactBlock");

  const initials = getInitials(seller.name);
  const bgColor = getRandomColor();
  return (
    <Card className={cn("inline-flex border-none md:border-solid", className)}>
      <CardHeader className="justify-center px-5">
        <Link href={`/profile/${seller.id}`} className="hover:opacity-80">
          <Avatar className="h-16 w-16">
            <AvatarImage src={seller.image} className="object-cover" />
            <AvatarFallback className={cn("text-xl font-medium", bgColor)}>
              {initials}
            </AvatarFallback>
          </Avatar>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3.5 p-5">
        <Link href={`/profile/${seller.id}`} className="hover:underline">
          <CardTitle className="text-lg font-normal">{seller.name}</CardTitle>
        </Link>
        <CardDescription className="flex gap-2.5">
          <Phone className="size-[18px] fill-cyan-400 text-cyan-400" />
          {seller.phone || "Телeфон не указан"}
        </CardDescription>
        <Button
          variant="outline"
          className="h-fit min-w-40 px-2 py-1 text-cyan-400"
          disabled={!seller.phone}
        >
          {t("call")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
