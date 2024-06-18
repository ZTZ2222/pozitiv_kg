import React from "react";
import { category_attrs } from "@/utils/fake_api";
import CreateAdForm from "@/features/ads/forms/CreateAdForm";

const PostAd = async () => {
  const data = category_attrs;

  return <CreateAdForm attributes={data} />;
};

export default PostAd;
