import React from "react";
import { PageLayout } from "../../components/structure";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex items-center">
        <div className="w-full flex justify-between">
          <div>
            <h1>
              WELCOME TO <span className="text-blue-500">EAZIWASH</span>
            </h1>
            <p>WE OFFER FULL ON DEMAND LAUNDRY SERVICE</p>

            <div>
              <ul>
                <li>Home Pickup & Delivery</li>
                <li>Timely Turnaround</li>
                <li>Affordable Prices</li>
                <li>Satisfaction Guaranteed</li>
              </ul>
            </div>
          </div>
          <div>Login | account</div>
        </div>
      </div>
    </PageLayout>
  );
}
