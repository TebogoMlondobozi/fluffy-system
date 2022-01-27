import React from "react";
import { PageLayout } from "../../components/structure";
import useAuth from "../../hooks/use-auth";
import useOrder from "../../hooks/use-order";

export default function MyAccount() {
  const { user } = useAuth();
  const order = useOrder({ id: "61f2ce45e5ff3bc73019d245" });

  return (
    <PageLayout>
      <div>
        <div className="flex flex-col mb-4">
          <h1 className="text-right">
            Welcome {user.firstname} {user.lastname}
          </h1>
        </div>
      </div>
      <div>
        <h2 className="font-bold">Order Summery</h2>

        <table>
          <tr className="grid grid-cols-6 grid-flow-x gap-x-4 bg-gray-300">
            <thead>#</thead>
            <thead>Item name</thead>
            <thead className="start-col-2 col-span-2">Description</thead>
            <thead>Category</thead>
            <thead>Quantity</thead>
          </tr>
          {(order?.items || []).map((orderItem, index) => (
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
          <tr className="grid grid-cols-6 grid-flow-x gap-x-4 bg-gray-300">
            <thead className="font-bold col-span-5">Total quantity</thead>
            <thead className="font-bold">
              {(order?.items || []).reduce((acc, item) => acc + item.qty, 0)}
            </thead>
          </tr>
        </table>
      </div>
    </PageLayout>
  );
}
