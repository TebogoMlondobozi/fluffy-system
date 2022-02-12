import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/alerts/alert-message";
import OrderTable from "../../components/orders/order-table";
import { PageLayout } from "../../components/structure";
import { recordPayment } from "../../features/cart/cartSlice";
import useAuth from "../../hooks/use-auth";
import useOrder from "../../hooks/use-order";
import useOrderId from "../../hooks/use-order-id";

export default function PaymentSuccessful() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState();

  const { user } = useAuth();
  const { orderId } = useOrderId();
  const order = useOrder({ orderId, userId: user._id });

  useEffect(() => {
    if (
      order?._id &&
      (!order.payment || order.payment.paymentStatus !== "COMPLETED")
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
        payment_status: "COMPLETED",
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
        {order ? <OrderTable order={order} /> : null}

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
