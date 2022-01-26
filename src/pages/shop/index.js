import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PageLayout } from "../../components/structure";
import useProductCatalog from "../../hooks/use-product-catalog";
import { addCartItem, removeCartItem } from "../../features/cart/cartSlice";

export default function Shop() {
  const { catalog } = useProductCatalog();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="mb-4 w-2/3 flex flex-col items-center">
        <h1 className="pt-4">LAUNDRY SERVICES</h1>
      </div>

      <div className="flex justify-center items-center">
        {!catalog ? (
          <p>Loading services...</p>
        ) : (
          <div className="flex flex-col space-x-10">
            <h1 className="text-center mb-4">
              We offer dry cleaning and laundry services for the following
              catalog of clothes.
            </h1>
            <ul className="grid gap-8 grid-cols-3 ">
              {catalog.map((product) => (
                <li key={product._id} className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-4 w-60 h-60">
                    <div
                      className="hover:bg-gray-200 hover:cursor-pointer"
                      onClick={() =>
                        navigate(generatePath(`/product/:_id`, product))
                      }
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
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
