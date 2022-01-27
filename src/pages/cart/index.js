import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";
import { PageLayout } from "../../components/structure";
import {
  incrementItemQty,
  decrementItemQty,
  createOrder,
} from "../../features/cart/cartSlice";
import useAuth from "../../hooks/use-auth";
import useCart from "../../hooks/use-cart";

export default function Cart() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { items } = useCart();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div style={{ margin: "20px auto" }}>
        <div className="flex mb-5 font-bold">
          <h1 className="flex-1">CART ITEMS</h1>
          <h1 className="flex-1">QTY(+/-)</h1>
        </div>

        {items.map((item) => (
          <div key={item._id} className="flex mb-4">
            <div
              className="flex space-x-4 hover:cursor-pointer flex-1"
              onClick={() => navigate(generatePath(`/product/:_id`, item))}
            >
              <div className="w-28">
                <img src={item.img.dataUrl} alt="not available" />
              </div>
              <div>
                <h3 className="font-bold">Product Information</h3>
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span>{item.description}</span>
                  <span>Qty: {item.qty || 0}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-start space-x-4 flex-1">
              <button
                className="font-bold w-10 h-10 hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1"
                onClick={() => dispatch(incrementItemQty(item))}
              >
                +
              </button>
              <button
                className="font-bold w-10 h-10 hover:bg-gray-200 hover:text-black bg-gray-400 text-black rounded-lg p-1"
                onClick={() => dispatch(decrementItemQty(item))}
              >
                -
              </button>
            </div>
          </div>
        ))}

        {items.length > 0 ? (
          <div className="z-1">
            <h1 className="font-bold top">ORDER INFORMATION</h1>
            <div className="flex space-x-4">
              <button
                className="font-bold hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1"
                onClick={() =>
                  !user
                    ? navigate(generatePath("/login", { replace: false }))
                    : dispatch(
                        createOrder({
                          orderInfo: {
                            clientId: user._id,
                            items: items.map((item) => ({
                              ...item,
                              img: undefined,
                            })),
                          },
                        })
                      )
                }
              >
                Create Order
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
