import { cn } from "@/lib/utils";
import { zPromotionAttribute } from "@/types/ad.schema";
import React from "react";

type Props = {
  attributes: zPromotionAttribute[];
  className?: string;
};

const AdDetails: React.FC<Props> = ({ attributes, className }) => {
  return (
    <>
      <ul className={cn("divide-y divide-gray-200", className)}>
        {attributes.map((attribute) => (
          <li
            key={attribute.title}
            className="flex flex-col gap-3.5 py-5 md:flex-row"
          >
            <p className="w-full text-gray-500">{attribute.title}</p>
            <p className="line-clamp-2 w-full font-semibold text-gray-800">
              {attribute.value}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdDetails;
