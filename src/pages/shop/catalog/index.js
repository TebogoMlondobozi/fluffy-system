import PropTypes from "prop-types";
import React from "react";
import CatalogProduct from "./catalog-product";

export default function Catalog({ catalog }) {
  return (
    <>
      <ul className="grid gap-4 grid-cols-3">
        {catalog.map((product) => (
          <CatalogProduct key={product._id} product={product} />
        ))}
      </ul>
    </>
  );
}
Catalog.propTypes = {
  catalog: PropTypes.array.isRequired,
};
