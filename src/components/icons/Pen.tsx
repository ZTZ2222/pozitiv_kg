import React, { ComponentProps } from "react";

const Pen: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      {...props}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1358_12201)">
        <circle cx="15" cy="15" r="12" fill="white" />
      </g>
      <path
        d="M17.7959 13.1822L16.7353 12.1216L9.75 19.1069V20.1675H10.8107L17.7959 13.1822ZM18.8566 12.1216L19.9172 11.0609L18.8566 10.0002L17.7959 11.0609L18.8566 12.1216ZM11.432 21.6675H8.25V18.4856L18.3263 8.40925C18.6192 8.11635 19.094 8.11635 19.3869 8.40925L21.5083 10.5306C21.8012 10.8235 21.8012 11.2983 21.5083 11.5912L11.432 21.6675Z"
        fill="#828282"
      />
      <defs>
        <filter
          id="filter0_d_1358_12201"
          x="0"
          y="0"
          width="30"
          height="30"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1358_12201"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1358_12201"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Pen;
