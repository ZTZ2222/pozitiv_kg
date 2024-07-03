import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import React from "react";

type Props = {
  views_count: number;
  description: string;
  price: number;
  currency: string;
  exchange_price_after_discount: string;
  className?: string;
};

const AdHeading: React.FC<Props> = ({
  views_count,
  description,
  price,
  currency,
  exchange_price_after_discount,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <span className="inline-flex items-center gap-1.5 text-sm lg:order-last">
        <Eye className="size-4" /> {views_count}
      </span>

      <p className="text-2xl font-medium text-emerald-500 lg:order-3">
        {price} {currency === "USD" ? "$" : "сом"}
      </p>
      <p className="text-xl font-medium text-red-500 lg:order-4">
        {exchange_price_after_discount}
      </p>
      <p className="lg:order-1">{description}</p>
    </div>
  );
};

export default AdHeading;
