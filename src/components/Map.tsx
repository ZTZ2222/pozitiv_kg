import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Map = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative h-[227px] w-full md:h-[320px]", className)}>
      <Image
        src="/assets/other/mock-map.png"
        alt="Map"
        fill
        className="object-contain"
        sizes="(max-width: 600px) 100vw, 50vw"
      />
    </div>
  );
};

export default Map;
