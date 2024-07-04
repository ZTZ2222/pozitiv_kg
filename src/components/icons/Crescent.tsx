import React, { ComponentProps } from "react";

const Crescent: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      {...props}
      width="61"
      height="61"
      viewBox="0 0 61 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_1379_18566" fill="white">
        <path d="M1.88126 41.0237C-3.89098 25.4931 4.01968 8.22381 19.5502 2.45156C35.0808 -3.32068 52.3501 4.58998 58.1223 20.1205C63.8946 35.6511 55.9839 52.9204 40.4534 58.6926C24.9228 64.4649 7.65351 56.5542 1.88126 41.0237Z" />
      </mask>
      <path
        d="M-8.57031 12.9031L47.6708 -8.00001L-8.57031 12.9031ZM68.5739 48.2411L12.3328 69.1442L68.5739 48.2411ZM34.8293 60.783C19.2987 66.5552 2.0294 58.6445 -3.74284 43.114C-9.51509 27.5834 -1.60443 10.3141 13.9261 4.54188L19.5502 2.45156C7.12579 7.06936 1.73312 23.4028 7.50537 38.9334C13.2776 54.4639 28.0289 63.3104 40.4534 58.6926L34.8293 60.783ZM47.6708 -8.00001L68.5739 48.2411L47.6708 -8.00001Z"
        fill="url(#paint0_linear_1379_18566)"
        mask="url(#path-1-inside-1_1379_18566)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1379_18566"
          x1="19.5502"
          y1="2.45156"
          x2="40.4534"
          y2="58.6926"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37E5F0" />
          <stop offset="1" stopColor="#1EA69A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Crescent;
