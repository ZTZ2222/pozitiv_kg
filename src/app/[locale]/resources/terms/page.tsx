import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import { getLocale } from "next-intl/server";
import React from "react";

type zTermsInfo = {
  title: string;
  description: string;
};

const getTermsInfo = async (): Promise<zTermsInfo> => {
  const locale = await getLocale();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/terms`, {
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

const TermsPage = async () => {
  const { title, description } = await getTermsInfo();
  return (
    <main className="container my-[100px] space-y-10">
      <BreadCrumbs path={["terms"]} />
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <div
        className="space-y-5"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </main>
  );
};

export default TermsPage;
