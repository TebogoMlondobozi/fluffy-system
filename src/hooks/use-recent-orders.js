import useSWR from "swr";
import { config } from "../config";
import { requestGET } from "../utils/network-requests";

export default function useRecentOrders(userId) {
  const { server_url } = config(process.env.NODE_ENV);

  const ordersKey = userId
    ? [`${server_url}/order/recentOrders/${userId}`]
    : null;
  const { data } = useSWR(ordersKey, (url) => requestGET({ url }));

  return data;
}
