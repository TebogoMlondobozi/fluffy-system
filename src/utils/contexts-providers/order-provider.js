import React from "react";
import PopTypes from "prop-types";
import { OrderContext } from "../contexts";
import useLocalStorage from "../../hooks/use-local-storage";

export default function OrderProvider({ children }) {
  const [orderId, setOrderId] = useLocalStorage({
    key: "orderId",
    defaultValue: "",
  });

  return (
    <OrderContext.Provider
      value={{
        orderId,
        setOrderId: async (orderId, callBack) => {
          if (orderId && callBack) {
            await setOrderId(orderId);
            callBack();
          }
        },
        compleOrder: () => {
          setOrderId();
        },
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

OrderContext.propTypes = {
  children: PopTypes.node,
};
