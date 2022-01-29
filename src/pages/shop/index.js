import React from "react";

import { PageLayout } from "../../components/structure";
import useProductCatalog from "../../hooks/use-product-catalog";

import Catalog from "./catalog";

export default function Shop() {
  const productCatalog = useProductCatalog();

  return (
    <PageLayout>
      <div className="pb-10 flex flex-col items-center">
        <h1>DRY CLEANING &amp; LAUNDRY SERVICES</h1>
      </div>

      {!productCatalog ? (
        <p>Loading product catalog...</p>
      ) : (
        <Catalog {...productCatalog} />
      )}
    </PageLayout>
  );
}
