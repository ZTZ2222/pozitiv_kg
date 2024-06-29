import React, { ComponentProps } from "react";

const UserCircle: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg {...props} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0ZM4.02332 13.4163C5.49083 15.6069 7.69511 17 10.1597 17C12.6243 17 14.8286 15.6069 16.2961 13.4163C14.6885 11.9172 12.5312 11 10.1597 11C7.78821 11 5.63095 11.9172 4.02332 13.4163ZM10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.3431 3 7 4.34315 7 6C7 7.65685 8.3431 9 10 9Z" />
    </svg>
  );
};

export default UserCircle;
