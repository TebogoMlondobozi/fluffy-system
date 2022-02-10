import React from "react";
import { LoginForm } from "../../components/forms";
import { PageLayout } from "../../components/structure";
import useAuth from "../../hooks/use-auth";

export default function Home() {
  const { signin, user } = useAuth();

  return (
    <PageLayout>
      <div
        className="lg:p-20 w-full flex justify-between space-x-3"
        id="home-content"
      >
        <div className="border-r-2 border-dotted pr-10">
          <h1 className="text-lg font-bold">
            WELCOME TO <span className="text-blue-400">EAZEEWASH</span>
          </h1>
          <p className="text-lg font-bold">
            WE OFFER FULL ON DEMAND DRY CLEANING &amp; LAUNDRY SERVICES
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

        {!user ? <LoginForm {...{ signin }} /> : null}
      </div>
    </PageLayout>
  );
}
