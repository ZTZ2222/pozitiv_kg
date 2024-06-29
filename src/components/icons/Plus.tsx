import React, { ComponentProps } from "react";

const Plus: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg {...props} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6V1C6 0.447715 6.44772 0 7 0C7.55228 0 8 0.447715 8 1V6H13C13.5523 6 14 6.44772 14 7C14 7.55228 13.5523 8 13 8H8V13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13V8H1C0.447715 8 0 7.55228 0 7C0 6.44772 0.447715 6 1 6H6Z" />
    </svg>
  );
};

export default Plus;
