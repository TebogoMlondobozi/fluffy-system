import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/alerts/alert-message";
import { PageLayout } from "../../components/structure";
import { recordPayment } from "../../features/cart/cartSlice";
import useAuth from "../../hooks/use-auth";
import useOrder from "../../hooks/use-order";
import useOrderId from "../../hooks/use-order-id";
import ItemSubtotal from "../cart/item-subtotal";
import OrderTotal from "../cart/order-total";

export default function PaymentCancelled() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState();

  const { user } = useAuth();
  const { orderId } = useOrderId();
  const order = useOrder({ orderId, userId: user._id });

  useEffect(() => {
    if (
      order?._id &&
      (!order.payment || order.payment.paymentStatus !== "CANCELLED")
    ) {
      const grossAmount = order.items.reduce(
        (acc, { qty, unit_price }) =>
          parseFloat(unit_price) * parseInt(qty) + acc,
        0
      );
      const payment = {
        custom_str1: order._id,
        custom_str2: order.client,
        item_description:
          order.items.length > 1
            ? `${user.firstname} placed ${order.items.length} order items`
            : order.items[0].description,
        amount_gross: grossAmount,
        amount_fee: order.amountFee || 0,
        amount_net: grossAmount - (order.amountFee || 0),
        payment_status: "CANCELLED",
      };

      dispatch(
        recordPayment({
          payment,
          onSuccess: ({ paidOrder, message }) => setAlertMessage(message),
        })
      );
    }
  }, [dispatch, order, user.firstname]);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center space-y-4">
        <AlertMessage alertMessage={alertMessage} />
        {order ? (
          <table>
            <thead className="text-left">
              <tr className="grid grid-cols-7 grid-flow-x gap-x-4 bg-gray-300">
                <th>#</th>
                <th>Item name</th>
                <th className="start-col-2 col-span-2">Description</th>
                <th>Category</th>
                <th className="text-center">Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(order.items || []).map((orderItem, index) => (
                <tr
                  className="grid grid-cols-7 grid-flow-x gap-x-4"
                  key={orderItem._id}
                >
                  <td>{index + 1}.</td>
                  <td>{orderItem.name}</td>
                  <td className="start-col-2 col-span-2">
                    {orderItem.description}
                  </td>
                  <td>{orderItem.category}</td>
                  <td className="text-center">{orderItem.qty}</td>
                  <td>
                    <ItemSubtotal item={orderItem} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="grid grid-cols-7 grid-flow-x gap-x-4 bg-gray-300">
                <td className="font-bold col-span-6">Order Total:</td>
                <td>
                  <OrderTotal items={order.items || []} />
                </td>
              </tr>
            </tfoot>
          </table>
        ) : null}

        <button
          className="w-1/4 rounded-lg bg-blue-400 text-white"
          onClick={() => navigate("/profile", { replace: true })}
        >
          Confirm
        </button>
      </div>
    </PageLayout>
  );
}
