import { useContext } from "react";
import { OrderContext } from "../utils/contexts";

/*This provides the order context which has orderId of the current order*/

export default function useOrderId() {
  return useContext(OrderContext);
}
