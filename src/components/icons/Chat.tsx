import React, { ComponentProps } from "react";

const Chat: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg {...props} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.29117 18.8242L0 20L1.17581 14.7088C0.42544 13.3056 0 11.7025 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C8.2975 20 6.6944 19.5746 5.29117 18.8242Z" />
    </svg>
  );
};

export default Chat;
