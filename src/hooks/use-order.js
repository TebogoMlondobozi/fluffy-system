import useSWR from "swr";
import { config } from "../config";
import { requestGET } from "../utils/network-requests";

export default function useOrder({ orderId, userId }) {
  const { server_url } = config(process.env.NODE_ENV);
  const orderKey = orderId
    ? [`${server_url}/order/${orderId}/user/${userId}`]
    : null;

  const { data } = useSWR(orderKey, (url) => requestGET({ url }));

  return data;
}
