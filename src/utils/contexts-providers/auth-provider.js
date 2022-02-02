import React from "react";
import PopTypes from "prop-types";
import { AuthContext } from "../contexts";
import { signin, registerAccount } from "../account";
import useLocalStorage from "../../hooks/use-local-storage";

export default function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage({ key: "user" });

  return (
    <AuthContext.Provider
      value={{
        user,
        signin: async (logins, callBack) => {
          const { success, user } = await signin(logins);
          if (success) {
            setUser({ ...user });
            callBack();
          }
        },
        signOut: () => {
          setUser();
        },
        registerAccount: async (accountInfo, callBack) => {
          const { user, message, success } = await registerAccount(accountInfo);
          if (success) {
            setUser(user);
            callBack(message);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PopTypes.node,
};
