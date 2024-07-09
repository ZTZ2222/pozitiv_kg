import React from "react";
import PromotionForm from "@/components/ads/forms/PromotionForm";
import { getCategories } from "@/actions/category-actions";
import { getCities } from "@/actions/ads-actions";

const PostAd = async () => {
  const categories = await getCategories();
  const cities = await getCities();

  return (
    <div className="container">
      <PromotionForm categories={categories} cities={cities} />
    </div>
  );
};

export default PostAd;
