import React, { useState } from "react";
import PopTypes from "prop-types";
import { OrderItemContext } from "../contexts/order-item-context";

export default function OrderItemProvider({ children }) {
  const [itemMessage, setMessage] = useState();
  return (
    <OrderItemContext.Provider
      value={{
        itemMessage,
        setOrderItemMessage: (message) => setMessage(message),
      }}
    >
      {children}
    </OrderItemContext.Provider>
  );
}

OrderItemProvider.propTypes = {
  children: PopTypes.node,
};
