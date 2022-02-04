import { config } from "../../config";
import { requestPOST } from "../network-requests";

export const register = async (acountInfo) => {
  const { server_url } = config(process.env.NODE_ENV);
  const url = `${server_url}/account/register`;
  try {
    return await requestPOST({
      url,
      data: acountInfo,
    }).then((res) => res);
  } catch (e) {
    console.log("Failed creating new user", e);
  }
};
