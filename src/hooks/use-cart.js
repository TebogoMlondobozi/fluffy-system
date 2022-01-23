import { useSelector } from "react-redux";

export default function useCart() {
  const cart = useSelector((state) => state.cart);

  return cart;
}
