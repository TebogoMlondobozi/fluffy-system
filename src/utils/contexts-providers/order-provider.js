import React from "react";
import PopTypes from "prop-types";
import { OrderContext } from "../contexts";
import useLocalStorage from "../../hooks/use-local-storage";

export default function OrderProvider({ children }) {
  const [orderId, setOrderId] = useLocalStorage({ key: "orderId" });

  return (
    <OrderContext.Provider
      value={{
        orderId,
        setOrderId: async (orderId, callBack) => {
          if (orderId) {
            setOrderId({ orderId });
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
