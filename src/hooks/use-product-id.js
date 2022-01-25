import useSWR from "swr";
import { requestGET } from "../utils/network-requests";

export default function useProduct({ id }) {
  const productKey = id
    ? [`http://localhost:3000/catalog/product/${id}`]
    : null;

  const { data: product } = useSWR(productKey, (url) => requestGET({ url }));

  return product;
}
