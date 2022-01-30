import useSWR from "swr";
import { requestGET } from "../utils/network-requests";

export default function useOrder({ orderId }) {
  const orderKey = orderId ? [`http://localhost:3000/order/${orderId}`] : null;

  const { data } = useSWR(orderKey, (url) => requestGET({ url }));

  return data;
}
