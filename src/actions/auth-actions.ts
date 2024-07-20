"use server";

import { cookies } from "next/headers";
import { fetchData } from "./safe-action";

// export const setAccessToken = async () => {
//   cookies().set(
//     "access_token",
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiZDhmZjVlNzJmZGVhMzM1NGJhZGY1MTEyYTY4Y2RlMmYwNmI5ZWE1YjI5NzViMWNmMjg3ODdkNGFkNjcxMDlkMjcxMTU4MjdmYTVhNWY3MDEiLCJpYXQiOjE3MjE0MTcyMjQuNDcxMTgzLCJuYmYiOjE3MjE0MTcyMjQuNDcxMTg3LCJleHAiOjE3NTI5NTMyMjQuNDU0NzgzLCJzdWIiOiI1MzkiLCJzY29wZXMiOltdfQ.ZwoWXpxrYG3GWnPFuXTCDjpBxoztvIWboyV78kWORj2SiSGEcI9XcnGhSMq-dv-lCsNA96iHhBLVX--lZPy5g-HyrrFz-YXtEqk_muBk9wbyQYC5PB_wu29c5Cd_7-kexwG0n7c9eJVECGpSe6VexmN1t6kHxE1Hp6WvRrqt-cT4Vul2zd8cY236uHD_o02qJ6z_obN7lKDOgAQ2FeEnUSRSkTwsJBeJXWlU77Hp6VLUCWFF1Wd5aprSfOYuAjsqHroMqS3o33NooRwQfn1ksxglHmC3JGLXycRpqLQAFdheFvAwIgMwATtnKoat7DkZfiwoEtz0AJnrllTr6sHqodlNCpYTWcOL4X7aG1N00R1vfSihEdCi9KV-xwla0fACArnTm_DqIhIPGYiQKS--poZNWag60O9tYMQ9CVXky6sVEQ5Hj3SrA0eXVD0hyKEPprE9R5bFuwJVzs-EH9gCwp9AXoPOm_sY_ap8pDa0tLBJ4Wr9H331qA1K2aevN4E4-bVE_NaY0xqL5zNUv0IoxAlOrCmvqRzo-l5JYWONR1zceiULa21ebH6l-J7DRklMd5jAlr0_iifd4Dmj6x9wYSjsprl_2APRiFsFztGK5mIu-1OERyfanFVJF3ccOu_7CQbJQRJgRNVgwZ5Kzmw5hFMs-q9NA7GIrCg457G0j7w",
//   );
// };

export async function storeToken(token: string) {
  cookies().set({
    name: "access_token",
    value: token,
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
  });
}

export const exchangeCodeForToken = async (code: string): Promise<string> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback?code=${code}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  const {
    data: { token },
  } = await fetchData(endpoint, options);
  return token;
};
