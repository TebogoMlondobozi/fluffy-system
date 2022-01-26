import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";
import PropTypes from "prop-types";

import { addCartItem, removeCartItem } from "../../../features/cart/cartSlice";

export default function CatalogProduct({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <li key={product._id} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 w-60 h-60">
        <div
          className="hover:bg-gray-200 hover:cursor-pointer"
          onClick={() => navigate(generatePath(`/product/:_id`, product))}
        >
          <img src={product.img.dataUrl} alt="not available" />
          <div className="flex flex-col">
            <span>{product.name}</span>
            <span className="truncate">{product.description}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1"
            onClick={() => dispatch(addCartItem(product))}
          >
            Add Item
          </button>
          <button
            className="hover:bg-gray-200 hover:text-white bg-gray-400 text-black rounded-lg p-1"
            onClick={() => dispatch(removeCartItem(product))}
          >
            Remove Item
          </button>
        </div>
      </div>
    </li>
  );
}

CatalogProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
