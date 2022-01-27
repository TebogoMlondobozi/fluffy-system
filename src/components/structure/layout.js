import React from "react";
import PropTypes from "prop-types";
import eaziwash_logo from "../../assets/eaziwash-logo.png";
import { NavLink, SiteTopNav } from "../navigation";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center h-screen w-full justify-between">
      <div className="w-2/3">
        <div className="border-b-2 p-4 flex justify-between">
          <div>
            <div className="w-20">
              <NavLink to="/">
                <img src={eaziwash_logo} alt="logo not available" />
              </NavLink>
            </div>
          </div>

          <SiteTopNav />
        </div>

        <div className="h-screen pt-10">
          {children}
          <div className="mt-10 p-4">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold">Our Partners</h2>
              <div className="flex space-x-4 mb-10">
                <div>Parnter A</div>
                <div>Parnter B</div>
                <div>Parnter C</div>
                <div>Parnter D</div>
              </div>
            </div>
            <div className="flex space-x-8 justify-between">
              <div>
                <div className="w-20">
                  <NavLink to="/">
                    <img src={eaziwash_logo} alt="logo not available" />
                  </NavLink>
                </div>
              </div>

              <div>
                <h2 className="font-bold">Operating Times:</h2>
                <div>Times</div>
              </div>

              <div>
                <h2 className="font-bold">Services</h2>
                <div>Dry Cleaning</div>
                <div>Laundry &amp; Ironing</div>
              </div>

              <div>
                <h2 className="font-bold">Comapny address</h2>
                <div>Business address here</div>
              </div>

              <div>
                <h2 className="font-bold">Contact US</h2>
                <div>Contact details</div>
                <p className="flex space-x-4">
                  <span>Twitter</span>
                  <span>Facebook</span>
                  <span>Tik Talk</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
