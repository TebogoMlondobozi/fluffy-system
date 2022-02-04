import useSWR from "swr";
import { config } from "../config";
import { requestGET } from "../utils/network-requests";

export function usePickupAddress({ userId }) {
  const { server_url } = config(process.env.NODE_ENV);

  const addressKey = userId
    ? [`${server_url}/account/address/${userId}`]
    : null;

  const { data: pickupAddress, mutate } = useSWR(addressKey, (url) =>
    requestGET({ url })
  );

  return { pickupAddress, mutate };
}
