import { getUserInfo } from "@/actions/user-actions";
import BackButton from "@/components/navigation/BackButton";
import UserForm from "@/components/profile/UserForm";
import React from "react";

const EditProfile = async () => {
  const { name, phone, email } = await getUserInfo();
  return (
    <div className="container">
      <BackButton variant="router" className="mt-[30px]" />
      <UserForm name={name} phone={phone} email={email} />
    </div>
  );
};

export default EditProfile;
