import { Eye } from "lucide-react";
import React from "react";

type Props = {
  views_count: number;
  description: string;
  price: number;
  currency: string;
  exchange_price_after_discount: string;
};

const AdHeading: React.FC<Props> = ({
  views_count,
  description,
  price,
  currency,
  exchange_price_after_discount,
}) => {
  return (
    <div className="mt-5">
      <span className="mb-5 inline-flex items-center justify-center gap-1 text-xs">
        <Eye className="size-4" /> {views_count}
      </span>
      <p className="mb-3.5 text-2xl font-medium text-emerald-500">
        {price} {currency === "USD" ? "$" : "сом"}
      </p>
      <p className="mb-[40px] text-xl font-medium text-red-500">
        {exchange_price_after_discount}
      </p>
      <p className="">{description}</p>
    </div>
  );
};

export default AdHeading;
