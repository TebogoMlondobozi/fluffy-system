import React, { useState } from "react";
import PopTypes from "prop-types";
import { AuthContext } from "../contexts";
import { signin, registerAccount } from "../account";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider
      value={{
        user,
        signin: async (logins, callBack) => {
          const authedUser = await signin(logins);
          if (authedUser) {
            setUser(authedUser);
            callBack();
          }
        },
        signOut: () => {
          // signOut(setUser);
          setUser();
        },
        registerAccount: async (accountInfo, callBack) => {
          const registeredUser = await registerAccount(accountInfo);
          if (registeredUser) {
            setUser(registeredUser);
            callBack();
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
