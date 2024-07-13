import { getAdInfo, getCities } from "@/actions/ads-actions";
import { getCategories } from "@/actions/category-actions";
import PromotionUpdateForm from "@/components/ads/forms/PromotionUpdateForm";
import { Ornament } from "@/components/icons";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const EditPromotionPage: React.FC<Props> = async ({ params }) => {
  const promotion = await getAdInfo(params.id);
  const categories = await getCategories();
  const cities = await getCities();
  return (
    <div className="container my-10 items-center justify-center md:flex lg:my-0 lg:justify-between">
      <PromotionUpdateForm
        promotion={promotion}
        categories={categories}
        cities={cities}
      />
      <Ornament className="hidden h-[1000px] w-full lg:block" />
    </div>
  );
};

export default EditPromotionPage;
