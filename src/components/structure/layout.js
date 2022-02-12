import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import eaziwash_logo from "../../assets/eazee-wash-logo.png";
import netfresh_logo from "../../assets/netfresh-logo.jpeg";
import mlo_logo from "../../assets/mlo-logo.png";
import payfast_logo from "../../assets/pay-fast-logo.png";

import { NavLink, SiteTopNav } from "../navigation";
import OrderProvider from "../../utils/contexts-providers/order-provider";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-center items-center bg-white w-full border-b-2 sticky top-0">
        <div className="w-2/3">
          <div className="bg-white p-4 flex justify-between">
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
        </div>
      </div>
      <div className="flex justify-center items-center w-full p-4">
        <div className="w-2/3">{children}</div>
      </div>
      <div className="flex justify-center items-center bg-gray-400 w-full">
        <div className="flex flex-col items-center w-2/3">
          <div>
            <div className="flex flex-col items-center p-10">
              <h2 className="font-semibold">Our Partner(s)</h2>
              <div className="flex space-x-4 items-center justify-center">
                <div className="w-36">
                  <img src={netfresh_logo} alt="Logo not available" />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-1 gap-4">
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
                <Link to="/terms-and-conditions/" className="text-blue-500">
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
                <span>
                  <img src={payfast_logo} alt="logo not available" />
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 text-center">
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
