"use client";

import React from "react";
import { updateUserImage } from "@/actions/user-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pen } from "@/components/icons";
import { cn, getInitials } from "@/lib/utils";
import { zUserRead } from "@/types/user.schema";

type Props = {
  userInfo?: zUserRead;
  className?: string;
};

const UserImageUpload: React.FC<Props> = ({ userInfo, className }) => {
  const initials = getInitials(userInfo?.name || "Annonymous");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = e.target.closest("form");
    if (form) {
      form.requestSubmit();
    }
  };
  return (
    <div className={cn("relative mx-auto size-[100px]", className)}>
      <Avatar className="size-[100px]">
        <AvatarImage src={userInfo?.image} />
        <AvatarFallback className={cn("text-4xl font-medium", "bg-indigo-200")}>
          {initials}
        </AvatarFallback>
      </Avatar>
      <form className="absolute right-0 top-0" action={updateUserImage}>
        <label htmlFor="profile-picture">
          <Pen />
          <input
            id="profile-picture"
            type="file"
            name="image"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      </form>
    </div>
  );
};

export default UserImageUpload;
