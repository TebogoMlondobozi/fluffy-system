import React from "react";
import { PageLayout } from "../../components/structure";

export default function Legal() {
  return (
    <PageLayout>
      <div className="flex flex-col items-start border-b-2 border-dotted">
        <h1 className="text-lg">Terms and Conditions</h1>
        <h2>Please be aware of all our terms before you place an order</h2>
      </div>
      <div className="flex flex-col items-start lg:p-20 space-y-4">
        <h1 className="text-lg">Disclaimer</h1>
        <h2 className="text-md">
          Whilst every care is taken with goods entrusted to us, we are not
          responsible or liable for the following:
        </h2>
        <ul>
          <li>Broken or Missing beads, zips, buckles or buttons</li>
          <li>Non removal of stains</li>
          <li>
            Loss of colour, fading or loss of shape of natural fabrics such as
            pure and blended linen,Suede&apos;s and leather.
          </li>
        </ul>

        <h2>Disclaimer: Minimum order price is ZAR 250.00</h2>
      </div>
    </PageLayout>
  );
}
