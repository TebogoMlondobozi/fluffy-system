import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import AlertMessage from "../../components/alerts/alert-message";
import { AddressForm, PaymentForm } from "../../components/forms";
import { PageLayout } from "../../components/structure";

import useAuth from "../../hooks/use-auth";
import useOrder from "../../hooks/use-order";
import useOrderId from "../../hooks/use-order-id";
import ItemSubtotal from "../cart/item-subtotal";
import OrderTotal from "../cart/order-total";
import EFTPayment from "./eft-payment";

export default function Payment() {
  const { user } = useAuth();
  const { orderId } = useOrderId();
  const order = useOrder({ orderId, userId: user._id });

  const [alertMessage, setAlertMessage] = useState();

  return (
    <PageLayout>
      <AlertMessage {...{ alertMessage }} />
      <div className="grid lg:grid-cols-2 md:grid-col-1 gap-4 mb-4">
        <div>
          <h2 className="font-bold">Order Items</h2>

          {!order ? (
            <div className="p-4 rounded-lg bg-gray-300 w-full h-1/2 flex items-center justify-center">
              <div>
                <p className="font-bold">
                  Oops, you have not placed an order yet, please{" "}
                  <span className="text-blue-500">
                    <NavLink to="/shop">visit shop</NavLink>
                  </span>{" "}
                  to add items to your cart.
                </p>
              </div>
            </div>
          ) : (
            <table>
              <thead className="text-left">
                <tr className="grid grid-cols-5 grid-flow-x gap-x-4 bg-gray-200">
                  <th>Name</th>
                  <th className="start-col-2 col-span-2">Description</th>
                  <th>Quantity</th>
                  <th>Sub total</th>
                </tr>
              </thead>

              <tbody>
                {(order.items || []).map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="grid grid-cols-5 grid-flow-x gap-x-4"
                    >
                      <td>{item.name}</td>
                      <td className="start-col-2 col-span-2">
                        {item.description}
                      </td>
                      <td>{item.qty}</td>
                      <td>
                        <ItemSubtotal {...{ item }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="grid grid-cols-5 grid-flow-x gap-x-4 bg-gray-300">
                  <td className="font-bold col-span-4">Order Total:</td>
                  <td>
                    <OrderTotal items={order.items} />
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        <div className="text-right">
          <h2 className="font-bold">Your Pickup address</h2>

          <AddressForm callback={(message) => setAlertMessage(message)} />
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-4 w-full">
        <h2 className="text-center font-semibold">Select Payment Method:</h2>
        <div className="flex justify-between flex-wrap">
          <PaymentForm {...{ order }} />

          <EFTPayment />
        </div>
      </div>
    </PageLayout>
  );
}
