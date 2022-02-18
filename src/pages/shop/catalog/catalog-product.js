import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import { useNavigate, generatePath } from "react-router-dom";
import PropTypes from "prop-types";

import { addCartItem, removeCartItem } from "../../../features/cart/cartSlice";
import useOrderItem from "../../../hooks/use-order-item";
import AlertMessage from "../../../components/alerts/alert-message";

export default function CatalogProduct({ product }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const { itemMessage, setOrderItemMessage } = useOrderItem();

  return (
    <li key={product._id} className="flex flex-col space-y-4">
      <div
        className="hover:cursor-pointer"
        // onClick={() => navigate(generatePath(`/product/:_id`, product))}
      >
        <div className="w-60 hover:scale-125">
          <img
            src={product.img.dataUrl}
            alt="not available"
            onLoad={() => setImageIsLoading(true)}
          />
        </div>
        <div className="flex flex-col">
          {!imageIsLoading ? (
            <div className="w-40">
              <Skeleton count={2} className="h-5" />
            </div>
          ) : (
            <>
              <span>{product.name}</span>
              <span className="break-word">{product.description}</span>
              <span>R{product?.unit_price}</span>
            </>
          )}
        </div>
      </div>
      {itemMessage && product.name === itemMessage?.itemName ? (
        <div className="flex items-center space-x-4">
          <AlertMessage alertMessage={itemMessage?.message} />
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <button
            className="hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1"
            onClick={() => {
              setOrderItemMessage({
                message: `${product.name} added to cart!`,
                itemName: product.name,
                success: true,
              });
              dispatch(addCartItem(product));
            }}
          >
            Add Item
          </button>
          <button
            className="hover:bg-gray-200 hover:text-white bg-gray-400 text-black rounded-lg p-1"
            onClick={() => {
              setOrderItemMessage({
                message: `${product.name} removed from cart!`,
                success: true,
              });
              dispatch(removeCartItem(product));
            }}
          >
            Remove Item
          </button>
        </div>
      )}
    </li>
  );
}

CatalogProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
