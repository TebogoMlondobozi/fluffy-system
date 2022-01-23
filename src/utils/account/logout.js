import { requestPOST } from "../network-requests";

export const signOut = async (callback) => {
  const url = "http://localhost:3000/account/logout";
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
