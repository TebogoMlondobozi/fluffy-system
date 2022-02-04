import useSWR from "swr";
import { config } from "../config";
import { requestGET } from "../utils/network-requests";

export default function useProductCatalog() {
  const { server_url } = config(process.env.NODE_ENV);
  const catalogKey = `${server_url}/catalog/products`;

  const { data: catalog } = useSWR(catalogKey, (url) => requestGET({ url }));

  return catalog;
}
