"use client";

import React, { useEffect, useRef } from "react";

interface BottomScrollerProps {
  dependencies: any[];
}

const BottomScroller: React.FC<BottomScrollerProps> = ({ dependencies }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [...dependencies]);

  return <div ref={containerRef} />;
};

export default BottomScroller;
