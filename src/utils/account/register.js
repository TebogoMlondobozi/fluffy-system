import { requestPOST } from "../network-requests";

export const register = async (acountInfo) => {
  const url = "http://localhost:3000/account/register";
  try {
    return await requestPOST({
      url,
      data: acountInfo,
    }).then((res) => res);
  } catch (e) {
    console.log("Failed creating new user", e);
  }
};
