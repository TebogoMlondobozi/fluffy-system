import React from "react";
import PropTypes from "prop-types";
import ItemSubtotal from "../../pages/cart/item-subtotal";
import OrderTotal from "../../pages/cart/order-total";

export default function OrderTable({ order }) {
  return (
    <table className="w-full">
      <thead className="text-left">
        <tr className="text-left bg-gray-300">
          <th>#</th>
          <th>Item</th>
          <th className="table-data p-2">Description</th>
          <th className="table-data p-2">Category</th>
          <th className="table-data p-2">Quantity</th>
          <th className="p-2">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {(order.items || []).map((orderItem, index) => (
          <tr className="text-left" key={orderItem._id}>
            <td>{index + 1}.</td>
            <td>{orderItem.name}</td>
            <td className="table-data p-2">{orderItem.description}</td>
            <td className="table-data p-2">{orderItem.category}</td>
            <td className="table-data p-2">{orderItem.qty}</td>
            <td>
              <ItemSubtotal item={orderItem} />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="text-left bg-gray-300">
          <td className="font-bold">Order Total:</td>
          <td></td>
          <td className="table-data"></td>
          <td className="table-data"></td>
          <td className="table-data"></td>
          <td>
            <OrderTotal items={order.items || []} />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
OrderTable.propTypes = {
  order: PropTypes.object,
};
