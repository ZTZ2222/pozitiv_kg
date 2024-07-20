import { fetchData } from "@/actions/safe-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";
import React from "react";

const SellerCard = async ({ sellerId }: { sellerId: string }) => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/sellers/${sellerId}`;
  const options: RequestInit = {
    cache: "no-store",
    next: { tags: [`seller-info-${sellerId}`] },
  };
  const { data: sellerInfo } = await fetchData(endpoint, options);
  return (
    <div className="flex h-fit items-center gap-4 border-b border-gray-300 pb-5 lg:min-w-[300px] lg:flex-col lg:gap-6 lg:border-b-0 lg:p-5 lg:shadow-[0px_0px_4px_0px_#9090904D]">
      <Avatar className="size-[50px] shrink-0 lg:size-[75px]">
        <AvatarImage src={sellerInfo.image} className="object-cover" />
        <AvatarFallback
          className={cn("text-xl font-medium lg:text-3xl", "bg-indigo-200")}
        >
          {getInitials(sellerInfo.name || "Anonymous")}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-4 text-gray-800">
        <span>{sellerInfo.name}</span>
        <div className="flex items-center gap-2 text-lg">
          <Phone className="size-5" />
          {sellerInfo.phone || "Телeфон не указан"}
        </div>
        <div className="flex items-center gap-2 text-lg lg:text-base">
          <Mail className="size-5" />
          {sellerInfo.email || "Email не указан"}
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
