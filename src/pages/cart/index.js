import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  generatePath,
  useParams,
  NavLink,
} from "react-router-dom";

import {
  incrementItemQty,
  decrementItemQty,
  createOrder,
  updateOrder,
  removeCartItem,
} from "../../features/cart/cartSlice";
import useAuth from "../../hooks/use-auth";
import useCart from "../../hooks/use-cart";
import useOrder from "../../hooks/use-order";
import useOrderId from "../../hooks/use-order-id";

import { PageLayout } from "../../components/structure";
import OrderTotal from "./order-total";
import ItemSubtotal from "./item-subtotal";
import AlertMessage from "../../components/alerts/alert-message";

export default function Cart() {
  const { id } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { items } = useCart();
  const { orderId, setOrderId } = useOrderId();
  const order = useOrder({ orderId, userId: user?._id });
  const navigate = useNavigate();
  const product = items.find((item) => item._id === id);

  const [alertMessage, setAlertMessage] = useState();

  useEffect(() => {
    if ((!id || !product) && items.length > 0) {
      navigate(generatePath(`/cart/:_id`, items[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, items.length]);

  return (
    <PageLayout>
      <AlertMessage alertMessage={alertMessage} />
      <div className="flex justify-between mb-4">
        <OrderTotal {...{ items }} withLabel />
        <div>
          {items.length > 0 ? (
            <button
              className="font-bold hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1"
              onClick={() => {
                if (!user) navigate(generatePath("/login", { replace: false }));
                if (!order) {
                  dispatch(
                    createOrder({
                      orderInfo: {
                        clientId: user._id,
                        items: items.map((item) => ({
                          ...item,
                          img: undefined,
                        })),
                      },
                      onSuccess: async ({ _id, message }) => {
                        try {
                          await setOrderId(_id, () => setAlertMessage(message));
                        } catch (error) {
                          console.log(
                            "Failed saving order to local storage",
                            error
                          );
                        } finally {
                          setTimeout(() => {
                            setAlertMessage();
                            navigate("/profile");
                          }, 1000);
                        }
                      },
                    })
                  );
                } else {
                  dispatch(
                    updateOrder({
                      orderInfo: {
                        clientId: user._id,
                        orderId: orderId,
                        items: items.map((item) => ({
                          ...item,
                          img: undefined,
                        })),
                      },
                      onSuccess: async ({ _id, message }) => {
                        try {
                          await setOrderId(_id, () => setAlertMessage(message));
                        } catch (error) {
                          console.log(
                            "Failed updating order to local storage",
                            error
                          );
                        } finally {
                          setTimeout(() => {
                            setAlertMessage();
                            navigate("/profile");
                          }, 1000);
                        }
                      },
                    })
                  );
                }
              }}
            >
              {order ? "Update Order" : "Create Order"}
            </button>
          ) : !alertMessage ? (
            <button
              className="font-bold hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1"
              onClick={() =>
                navigate(generatePath("/shop", { replace: false }))
              }
            >
              Visit shop
            </button>
          ) : null}
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between bg-gray-200 p-4 font-bold">
              <h2>CART ITEMS</h2>
              <h2 className="font-bold">QTY(+/-)</h2>
            </div>
            <ul className="flex flex-col space-y-4">
              {items.map((item) => {
                return (
                  <li
                    key={item._id}
                    className="flex items-center justify-between space-x-4 hover:cursor-pointer"
                  >
                    <NavLink to={generatePath(`/cart/:_id`, item)}>
                      <div className="flex flex-col items-start">
                        <div className="w-36">
                          <img src={item.img.dataUrl} alt="not available" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col">
                            <h3 className="font-bold">Product Information</h3>
                            <span>{item.name}</span>
                            <span className="">{item.description}</span>
                            <span>Qty: {item.qty || 0}</span>
                            <ItemSubtotal {...{ item }} withLabel />
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    <div className="flex justify-end space-x-4">
                      <button
                        className="font-bold w-10 h-10 hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1"
                        onClick={() => dispatch(incrementItemQty(item))}
                      >
                        +
                      </button>
                      <button
                        className="font-bold w-10 h-10 hover:bg-gray-200 hover:text-black bg-gray-400 text-black rounded-lg p-1"
                        onClick={() =>
                          item.qty === 0
                            ? dispatch(removeCartItem(item))
                            : dispatch(decrementItemQty(item))
                        }
                      >
                        -
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            {product ? (
              <div className="flex flex-col space-y-4 sticky top-0">
                <div className="hover:cursor-pointer">
                  <div>
                    <img src={product.img.dataUrl} alt="not available" />
                  </div>
                  <div>
                    <h3 className="font-bold">Product Information</h3>
                    <div className="flex flex-col">
                      <span>{product.name}</span>
                      <span>{product.description}</span>
                      <span>Qty: {product.qty || 0}</span>
                      <ItemSubtotal item={product} withLabel />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-gray-300 w-full h-1/2 flex items-center justify-center">
          <div>
            <p className="font-bold">
              Cart is empty,{" "}
              <span className="text-blue-500">
                <NavLink to="/shop">visit shop</NavLink>
              </span>{" "}
              to add items for your new order.
            </p>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
