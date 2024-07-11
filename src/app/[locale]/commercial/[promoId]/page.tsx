import React from "react";
import CommercialForm from "./CommercialForm";
import { getPaymentMethods } from "@/actions/commercial-actions";

type Props = {
  params: {
    promoId: string;
  };
};

const CommercialPage: React.FC<Props> = async ({ params }) => {
  const banks = await getPaymentMethods();
  return (
    <main className="container">
      <CommercialForm banks={banks} />
    </main>
  );
};

export default CommercialPage;
