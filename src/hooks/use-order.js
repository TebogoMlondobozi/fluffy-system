import useSWR from "swr";
import { requestGET } from "../utils/network-requests";

export default function useOrder({ orderId, userId }) {
  const orderKey = orderId
    ? [`http://localhost:3000/order/${orderId}/user/${userId}`]
    : null;

  const { data } = useSWR(orderKey, (url) => requestGET({ url }));

  return data;
}
