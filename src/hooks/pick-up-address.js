import useSWR from "swr";
import { requestGET } from "../utils/network-requests";

export function usePickupAddress({ userId }) {
  const addressKey = userId
    ? [`http://localhost:3000/account/address/${userId}`]
    : null;

  const { data: pickupAddress, mutate } = useSWR(addressKey, (url) =>
    requestGET({ url })
  );

  return { pickupAddress, mutate };
}
