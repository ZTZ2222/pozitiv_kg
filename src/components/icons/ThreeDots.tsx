import React, { ComponentProps } from "react";

const ThreeDots: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      {...props}
      width="3"
      height="18"
      viewBox="0 0 3 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 0C0.675 0 0 0.675 0 1.5C0 2.325 0.675 3 1.5 3C2.325 3 3 2.325 3 1.5C3 0.675 2.325 0 1.5 0ZM1.5 15C0.675 15 0 15.675 0 16.5C0 17.325 0.675 18 1.5 18C2.325 18 3 17.325 3 16.5C3 15.675 2.325 15 1.5 15ZM1.5 7.5C0.675 7.5 0 8.175 0 9C0 9.825 0.675 10.5 1.5 10.5C2.325 10.5 3 9.825 3 9C3 8.175 2.325 7.5 1.5 7.5Z"
        fill="black"
        fill-opacity="0.6"
      />
    </svg>
  );
};

export default ThreeDots;
