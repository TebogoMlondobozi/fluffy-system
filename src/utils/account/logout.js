import { config } from "../../config";
import { requestPOST } from "../network-requests";

export const signOut = async (callback) => {
  const { server_url } = config(process.env.NODE_ENV);

  const url = `${server_url}/account/logout`;
  try {
    const logoutRes = await requestPOST({
      url,
      data: {},
    });

    if (logoutRes.ok && callback) {
      callback();
    }
  } catch (e) {
    console.log("Failed loging user out", e);
  }
};
