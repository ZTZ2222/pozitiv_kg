import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-50 grid h-screen w-screen place-content-center bg-gradient-to-r from-cyan-400 to-fuchsia-500">
      <div className="relative h-[377px] w-[322px] animate-pulse">
        <Image
          src="/assets/logo/circle-logo-big.png"
          alt="Pozitiv Logo"
          className="object-contain"
          fill
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default Loading;
