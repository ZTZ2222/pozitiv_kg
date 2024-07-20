"use server";

import { fetchData } from "./safe-action";

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
