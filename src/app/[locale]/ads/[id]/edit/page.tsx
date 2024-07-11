import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const EditPromotionPage: React.FC<Props> = ({ params }) => {
  return (
    <main className="container mt-10 h-screen text-3xl">
      Promotion ID: {params.id}
    </main>
  );
};

export default EditPromotionPage;
