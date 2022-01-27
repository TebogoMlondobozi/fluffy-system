import { useSelector } from "react-redux";
import useSWR from "swr";
import { requestGET } from "../utils/network-requests";

export default function useOrder() {
  const { order } = useSelector((state) => state.cart);
  const orderKey = order?._id
    ? [`http://localhost:3000/order/${order._id}`]
    : null;

  const { data } = useSWR(orderKey, (url) => requestGET({ url }));

  return data;
}
