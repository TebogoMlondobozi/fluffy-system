import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../../components/structure";
import useProduct from "../../hooks/use-product-id";

export default function Product() {
  const { id } = useParams();
  const product = useProduct({ id });

  return (
    <PageLayout>
      {product ? <div>Product informaton page</div> : <div>Loading</div>}
    </PageLayout>
  );
}
