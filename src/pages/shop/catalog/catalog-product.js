import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import { useNavigate, generatePath } from "react-router-dom";
import PropTypes from "prop-types";

import {
  addCartItem,
  decrementItemQty,
  incrementItemQty,
  removeCartItem,
} from "../../../features/cart/cartSlice";
import useOrderItem from "../../../hooks/use-order-item";
import AlertMessage from "../../../components/alerts/alert-message";
import useCart from "../../../hooks/use-cart";

export default function CatalogProduct({ product }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const { itemMessage, setOrderItemMessage } = useOrderItem();
  const { items } = useCart();
  const itemAlreadyAdded = items.find((item) => item._id === product._id);

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
            className="w-20 hover:bg-blue-200 hover:text-white border-2 border-blue-300 text-blue-200 rounded-lg p-1"
            onClick={() => {
              itemAlreadyAdded
                ? dispatch(incrementItemQty(product))
                : dispatch(addCartItem(product));
              setOrderItemMessage({
                message: itemAlreadyAdded
                  ? `${product.name} quantity incremented!`
                  : `${product.name} added to cart!`,
                itemName: product.name,
                success: true,
              });
            }}
          >
            <span className="text-lg font-bold">+</span>
          </button>
          {items.find((item) => item._id === product._id) ? (
            <button
              className="w-20 hover:bg-red-200 hover:text-white border-2 border-red-300 text-red-200 rounded-lg p-1"
              onClick={() => {
                setOrderItemMessage({
                  message:
                    itemAlreadyAdded.qty === 1
                      ? `${product.name} removed from cart!`
                      : `${product.name} quantity decremented`,
                  itemName: product.name,
                  success: true,
                });

                itemAlreadyAdded.qty === 1
                  ? dispatch(removeCartItem(product))
                  : dispatch(decrementItemQty(product));
              }}
            >
              <span className="text-lg font-bold">-</span>
            </button>
          ) : null}
        </div>
      )}
    </li>
  );
}

CatalogProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
