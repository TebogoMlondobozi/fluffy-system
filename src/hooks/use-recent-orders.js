import useSWR from "swr";
import { requestGET } from "../utils/network-requests";

export default function useRecentOrders(userId) {
  const ordersKey = userId
    ? [`http://localhost:3000/order/recentOrders/${userId}`]
    : null;
  const { data } = useSWR(ordersKey, (url) => requestGET({ url }));

  return data;
}
