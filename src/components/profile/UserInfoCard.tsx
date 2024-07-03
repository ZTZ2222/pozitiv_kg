import { cn, getInitials, getRandomColor } from "@/lib/utils";
import { zSellerRead } from "@/types/user.schema";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Phone } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  seller: zSellerRead;
  className?: string;
};

const UserInfoCard: React.FC<Props> = ({ seller, className }) => {
  const initials = getInitials(seller.name);
  const bgColor = getRandomColor();
  return (
    <Card
      className={cn("inline-flex gap-5 border-none md:border-solid", className)}
    >
      <CardHeader className="justify-center p-3">
        <Avatar className="h-16 w-16">
          <AvatarImage src={seller.image} />
          <AvatarFallback className={cn("text-xl font-medium", bgColor)}>
            {initials}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="space-y-3.5 p-5">
        <CardTitle className="text-lg font-normal">{seller.name}</CardTitle>
        <CardDescription className="flex gap-2.5">
          <Phone className="size-[18px] fill-cyan-400 text-cyan-400" />
          {seller.phone || "Телфон не указан"}
        </CardDescription>
        <Button
          variant="outline"
          className="h-fit px-2 py-1 text-cyan-400"
          disabled={!seller.phone}
        >
          Позвонить
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
