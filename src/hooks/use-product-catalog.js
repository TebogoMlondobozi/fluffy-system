import useSWR from "swr";
import { requestGET } from "../utils/network-requests";

export default function useProductCatalog() {
  const catalogKey = "http://localhost:3000/catalog/products";

  const { data: catalog } = useSWR(catalogKey, (url) => requestGET({ url }));

  return catalog || { catalog: [] };
}
