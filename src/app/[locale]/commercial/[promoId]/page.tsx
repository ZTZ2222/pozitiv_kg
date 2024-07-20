import React from "react";
import CommercialForm from "./CommercialForm";
import { getPaymentMethods } from "@/actions/commercial-actions";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";

type Props = {
  params: {
    promoId: string;
  };
};

const CommercialPage: React.FC<Props> = async ({ params }) => {
  const banks = await getPaymentMethods();
  return (
    <main className="container">
      <BreadCrumbs path={["profile", "commercial"]} />
      <CommercialForm banks={banks} />
    </main>
  );
};

export default CommercialPage;
