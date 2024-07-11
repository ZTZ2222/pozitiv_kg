import { cookies } from "next/headers";
import { getUserInfo } from "@/actions/user-actions";

export const validateAccessToken = async (): Promise<boolean> => {
  const access_token = cookies().get("access_token")?.value;

  if (!access_token) {
    return false;
  }

  try {
    const currentUser = await getUserInfo();

    if (currentUser?.id) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
