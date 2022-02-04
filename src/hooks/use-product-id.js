import useSWR from "swr";
import { config } from "../config";
import { requestGET } from "../utils/network-requests";

export default function useProduct({ id }) {
  const { server_url } = config(process.env.NODE_ENV);
  const productKey = id ? [`${server_url}/catalog/product/${id}`] : null;

  const { data: product } = useSWR(productKey, (url) => requestGET({ url }));

  return product;
}
