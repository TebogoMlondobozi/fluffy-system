import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

export default function AuthenticatedRoute({ children }) {
  const authedUser = useAuth();
  let location = useLocation();

  if (!authedUser.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.node,
};
