import { getUserInfo } from "@/actions/user-actions";
import BackButton from "@/components/navigation/BackButton";
import UserForm from "@/components/profile/UserForm";
import React from "react";

const EditProfile = async () => {
  const userInfo = await getUserInfo();
  return (
    <div className="container">
      <BackButton
        variant="router"
        location="profile-edit"
        className="mt-[30px]"
      />
      <UserForm userInfo={userInfo} className="mx-auto" />
    </div>
  );
};

export default EditProfile;
