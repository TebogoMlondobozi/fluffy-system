import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import eaziwash_logo from "../../assets/eazee-wash-logo.png";
import netfresh_logo from "../../assets/netfresh-logo.jpeg";
import mlo_logo from "../../assets/mlo-logo.png";

import { NavLink, SiteTopNav } from "../navigation";
import OrderProvider from "../../utils/contexts-providers/order-provider";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center h-screen w-full justify-between">
      <div className="w-2/3">
        <div className="bg-white border-b-2 p-4 flex justify-between sticky top-0">
          <div>
            <div className="w-20">
              <NavLink to="/">
                <img src={eaziwash_logo} alt="logo not available" />
              </NavLink>
            </div>
          </div>

          <OrderProvider>
            <SiteTopNav />
          </OrderProvider>
        </div>

        <div className="h-screen pt-10">
          {children}
          <div className="mt-10 p-4 border-t-2 border-dotted">
            <div className="flex flex-col items-center p-10">
              <h2 className="font-semibold">Our Partner(s)</h2>
              <div className="flex space-x-4 items-center justify-center">
                <div className="w-36">
                  <img src={netfresh_logo} alt="Logo not available" />
                </div>
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
                <h2 className="font-bold">Pickup and Delivery Times :</h2>
                <div>
                  <p>
                    Monday–Friday: 6am – 5pm <br />
                    Saturday: 8am – 4pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-bold">Services</h2>
                <div>Dry Cleaning</div>
                <div>Laundry &amp; Ironing</div>
              </div>

              <div>
                <h2 className="font-bold">Legal</h2>
                <Link to="/terms-and-conditions/" className="text-blue-400">
                  Terms and Conditions
                </Link>
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
          <div className="p-4 text-center border-t-2 border-dotted">
            <p className="flex justify-center items-center space-x-2">
              <span>&copy; {new Date().getFullYear()}</span>
              <span>by</span>
              <span>
                <img
                  className="w-5 h-5"
                  src={mlo_logo}
                  alt="logo not available"
                />
              </span>
              <span>Mlo Solutions</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
