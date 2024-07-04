import { cookies } from "next/headers";
import NodeCache from "node-cache";
import { jwtVerify } from "jose";
import { zTokenPayload } from "@/types/token.schema";

const tokenStore = new NodeCache({ stdTTL: 600 });
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as zTokenPayload;
  } catch (error) {
    return null;
  }
};

export const validateAccessToken = async (): Promise<boolean> => {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    return false;
  }
  let tokenPayload = tokenStore.get<zTokenPayload>(access_token);

  if (!tokenPayload) {
    tokenPayload = await verifyToken(access_token);
    if (!tokenPayload) {
      return false;
    }
    tokenStore.set(access_token, tokenPayload);
  }

  if (tokenPayload.exp < Math.floor(Date.now() / 1000)) {
    return false;
  }

  return true;
};
