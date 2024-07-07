import React from "react";
import { getLocale } from "next-intl/server";

type zPrivacyInfo = {
  title: string;
  description: string;
};

const getPrivacyInfo = async (): Promise<zPrivacyInfo> => {
  const locale = await getLocale();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/privacy`, {
    cache: "no-store",
    headers: {
      "Accept-Language": locale,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data;
};

const PrivacyPage = async () => {
  const { title, description } = await getPrivacyInfo();
  return (
    <main className="container my-[100px] space-y-10">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <div
        className="space-y-5"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </main>
  );
};

export default PrivacyPage;
