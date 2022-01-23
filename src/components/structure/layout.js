import React from "react";
import PropTypes from "prop-types";
import eaziwash_logo from "../../assets/eaziwash-logo.png";
import { NavLink, SiteTopNav } from "../navigation";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center w-full justify-between">
      <div className="border-b-2 w-2/3 p-4 flex justify-between">
        <div>
          <div className="w-20">
            <NavLink to="/">
              <img src={eaziwash_logo} alt="logo not available" />
            </NavLink>
          </div>
        </div>

        <SiteTopNav />
      </div>

      {children}

      <div className="w-2/3">Footer here</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
