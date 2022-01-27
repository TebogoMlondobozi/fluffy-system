import React from "react";
import CatalogProduct from "./catalog-product";
import useProductCatalog from "../../../hooks/use-product-catalog";

export default function Catalog() {
  const { catalog } = useProductCatalog();
  return !catalog ? (
    <p>Loading catalog...</p>
  ) : (
    <div className="flex flex-col space-x-10">
      <ul className="grid gap-8 grid-cols-3 ">
        {catalog.map((product) => (
          <CatalogProduct key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
}
