import { requestPOST } from "../network-requests";

export const signin = async (logins) => {
  const url = "http://localhost:3000/account/login";
  try {
    return await requestPOST({
      url,
      data: logins,
    }).then((res) => res);
  } catch (e) {
    console.log("Failed signin new user", e);
  }
};
