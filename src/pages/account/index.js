import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/structure";
import useAuth from "../../hooks/use-auth";
import useOrder from "../../hooks/use-order";

export default function MyAccount() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const order = useOrder();

  return (
    <PageLayout>
      <div>
        <div className="flex flex-col mb-4">
          <h1 className="text-right">
            Welcome {user.firstname} {user.lastname}
          </h1>
        </div>
      </div>
      <div className="p-10 flex flex-col items-center justify-center space-y-4">
        <h2 className="font-bold">Order Summery</h2>
        {order ? (
          <div>
            <table>
              <thead className="text-left">
                <tr className="grid grid-cols-6 grid-flow-x gap-x-4 bg-gray-300">
                  <th>#</th>
                  <th>Item name</th>
                  <th className="start-col-2 col-span-2">Description</th>
                  <th>Category</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).map((orderItem, index) => (
                  <tr
                    className="grid grid-cols-6 grid-flow-x gap-x-4"
                    key={orderItem._id}
                  >
                    <td>{index + 1}.</td>
                    <td>{orderItem.name}</td>
                    <td className="start-col-2 col-span-2">
                      {orderItem.description}
                    </td>
                    <td>{orderItem.category}</td>
                    <td>{orderItem.qty}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="grid grid-cols-6 grid-flow-x gap-x-4 bg-gray-300">
                  <thead className="font-bold col-span-5">Total quantity</thead>
                  <thead className="font-bold">
                    {(order.items || []).reduce(
                      (acc, item) => acc + item.qty,
                      0
                    )}
                  </thead>
                </tr>
              </tfoot>
            </table>
            <div className="text-right pt-4">
              <button
                className="sticky top-0 font-bold hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1"
                onClick={() => navigate("/payment", { replace: false })}
              >
                Make payment
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {!order ? (
        <div className="p-20 rounded-lg bg-gray-300 w-full h-1/6 flex items-center justify-center">
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
      <div className="p-10 flex flex-col items-center justify-center space-y-4">
        <h2 className="font-bold">Order History</h2>
      </div>
    </PageLayout>
  );
}
