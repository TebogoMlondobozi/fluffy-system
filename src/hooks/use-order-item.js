import { useContext } from "react";
import { OrderItemContext } from "../utils/contexts/order-item-context";

/*This provides the order item context*/

export default function useOrderItem() {
  return useContext(OrderItemContext);
}
