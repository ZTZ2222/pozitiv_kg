import React from "react";
import CreateAdForm from "@/components/ads/forms/CreateAdForm";
import PromotionForm from "@/components/ads/forms/PromotionForm";
import { getCategories } from "@/actions/category-actions";

const PostAd = async () => {
  const categories = await getCategories();

  return <PromotionForm categories={categories} />;
};

export default PostAd;
