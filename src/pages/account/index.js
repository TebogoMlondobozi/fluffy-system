import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import OrderTable from "../../components/orders/order-table";
import { PageLayout } from "../../components/structure";
import useAuth from "../../hooks/use-auth";
import useOrder from "../../hooks/use-order";
import useOrderId from "../../hooks/use-order-id";

export default function MyAccount() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orderId } = useOrderId();
  const order = useOrder({ orderId, userId: user._id });

  return (
    <PageLayout>
      <div className="w-full flex flex-col mb-4">
        <h1 className="text-right">
          Welcome {user.firstname} {user.lastname}
        </h1>
        <h4 className="text-right text-sm">{user.emailAddress}</h4>
      </div>
      <div className="p-10 flex flex-col items-center justify-center space-y-4">
        <h2 className="font-bold">
          {order?.orderStatus === "CANCELLED"
            ? "Cancelled order summery"
            : "Order Summery"}
        </h2>
        {order && (!order.payment || order.orderStatus === "CANCELLED") ? (
          <div>
            <OrderTable order={order} />
            <div className="text-right pt-4">
              <button
                className="sticky top-0 font-bold hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1"
                onClick={() => navigate("/payment", { replace: false })}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {!order || order.orderStatus === "COMPLETED" ? (
        <div className="p-5 lg:p-20 rounded-lg bg-gray-300 w-full flex items-center justify-center">
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
      ) : null}
    </PageLayout>
  );
}
