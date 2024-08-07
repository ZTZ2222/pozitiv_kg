import React from "react";
import PromotionForm from "@/components/ads/forms/PromotionForm";
import { getCategories } from "@/actions/category-actions";
import { getCities } from "@/actions/ads-actions";
import { Ornament } from "@/components/icons";

const PostAd = async () => {
  const categories = await getCategories();
  const cities = await getCities();

  return (
    <div className="container my-10 items-center justify-center md:flex lg:my-0 lg:justify-between">
      <PromotionForm categories={categories} cities={cities} />
      <Ornament className="hidden h-[1000px] w-full lg:block" />
    </div>
  );
};

export default PostAd;
