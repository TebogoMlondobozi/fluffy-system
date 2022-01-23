import { useEffect, useState } from "react";
import { requestGET } from "../utils/network-requests";

export default function useProduct({ id }) {
  const [product, setProduct] = useState();

  useEffect(() => {
    if (!product) {
      requestGET({ url: `http://localhost:3000/catalog/product/${id}` }).then(
        (res) => setProduct(res)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return product;
}
