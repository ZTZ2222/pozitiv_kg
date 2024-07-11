"use client";

import { getAdInfo } from "@/actions/ads-actions";
import DotsDropdownMenu from "@/components/navigation/DotsDropdownMenu";
import ShareButton from "@/components/navigation/ShareButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/i18nNavigation";
import { zPromotionRead } from "@/types/ad.schema";
import { zUserRead } from "@/types/user.schema";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  currentUser?: zUserRead;
};

const Navbar: React.FC<Props> = ({ currentUser }) => {
  const router = useRouter();
  const { id } = useParams();
  const [promotion, setPromotion] = useState<zPromotionRead>();

  useEffect(() => {
    const fetchPromotionInfo = async () => {
      setPromotion(await getAdInfo(id as string));
    };
    fetchPromotionInfo();
  }, []);

  return (
    <nav className="container mt-[30px] flex justify-between lg:hidden">
      <Button
        className="flex h-fit w-fit shrink-0 justify-start p-1"
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <div className="flex items-center gap-2.5">
        <ShareButton />
        <DotsDropdownMenu currentUser={currentUser} promotion={promotion!} />
      </div>
    </nav>
  );
};

export default Navbar;
