import { cn, getInitials } from "@/lib/utils";
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
  return (
    <Card className={cn("inline-flex border-none md:border-solid", className)}>
      <CardHeader className="justify-center p-0">
        <Avatar className="h-12 w-12">
          <AvatarImage src={seller.image} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="space-y-2 p-5">
        <CardTitle className="text-lg font-normal">{seller.name}</CardTitle>
        <CardDescription className="flex gap-2.5">
          <Phone className="size-[18px] fill-cyan-400 text-cyan-400" />
          {seller.phone}
        </CardDescription>
        <Button variant="outline" className="h-fit px-2 py-1 text-cyan-400">
          Позвонить
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
