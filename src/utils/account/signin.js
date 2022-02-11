import { config } from "../../config";
import { requestPOST } from "../network-requests";

export const signin = async (logins) => {
  const { server_url } = config(process.env.NODE_ENV);

  const url = `${server_url}/account/login`;
  try {
    return await requestPOST({
      url,
      data: logins,
    }).then((res) => res);
  } catch (e) {
    throw new TypeError("Logins are not correct");
  }
};
