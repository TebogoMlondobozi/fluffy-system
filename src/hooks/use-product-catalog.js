import { useEffect, useState } from "react";
import { requestGET } from "../utils/network-requests";
export default function useProductCatalog() {
  const [catalog, setCatalog] = useState();

  useEffect(() => {
    if (!catalog) {
      requestGET({ url: "http://localhost:3000/catalog/products" }).then(
        (res) => setCatalog(res.catalog)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog]);

  return catalog || [];
}
