import PropTypes from "prop-types";
import React from "react";

export default function OrderTotal({ items, withLabel }) {
  return (
    <p>
      <span className="font-bold">
        {withLabel ? "Order Total:R" : "R"}
        {items.reduce(
          (acc, { qty, unit_price }) =>
            parseFloat(unit_price) * parseInt(qty) + acc,
          0
        )}
      </span>
    </p>
  );
}
OrderTotal.propTypes = {
  items: PropTypes.array,
  withLabel: PropTypes.bool,
};
