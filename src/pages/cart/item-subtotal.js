import PropTypes from "prop-types";
import React from "react";

export default function ItemSubtotal({ item, withLabel }) {
  return (
    <span className="font-semibold">
      {withLabel ? "Sub total:R" : "R"}
      {""}
      {(parseFloat(item.unit_price) || 0) * parseInt(item.qty)}
    </span>
  );
}

ItemSubtotal.propTypes = {
  item: PropTypes.object,
  withLabel: PropTypes.bool,
};
