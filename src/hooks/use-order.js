import useSWR from "swr";
import { requestGET } from "../utils/network-requests";

export default function useOrder({ id }) {
  const orderKey = id ? [`http://localhost:3000/order/${id}`] : null;

  const { data: order } = useSWR(orderKey, (url) => requestGET({ url }));

  return order;
}
