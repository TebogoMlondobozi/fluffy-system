import React from "react";
import { PageLayout } from "../../components/structure";

export default function Home() {
  return (
    <PageLayout>
      <div className="p-20 w-full flex justify-between">
        <div className="border-r-2 border-dotted pr-10">
          <h1 className="text-lg font-bold">
            WELCOME TO <span className="text-blue-500">EAZIWASH</span>
          </h1>
          <p className="text-lg font-bold">
            WE OFFER FULL ON DEMAND DRY CLEANING &amp; LAUNDRY SERVICE
          </p>

          <div className="p-10">
            <ul className="list-disc">
              <li>Home Pickup &amp; Delivery</li>
              <li>Timely Turnaround</li>
              <li>Affordable Prices</li>
              <li>Satisfaction Guaranteed</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
