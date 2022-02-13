import React from "react";

export default function EFTPayment() {
  return (
    <div className="text-center flex-1 lg:p-10">
      <h2 className="pb-2">EFT Payment</h2>
      <div className="flex flex-col items-center bg-gray-100 rounded-lg">
        <div className="p-8">
          <p className="text-left">
            For eft payment, please use the following bank details for payment
          </p>
          <div className="flex flex-col mt-4">
            <h1 className="text-left font-bold">Bank details:</h1>
            <ul className="text-left list-disc pl-8">
              <li>Bank name: Nedbank</li>
              <li>Account type: Current account</li>
              <li>Account no: 1201850649</li>
              <li>Branch code: 198765</li>
              <li>Branch name: Irene Mall</li>
              <li>Reference: client email</li>
            </ul>
          </div>
          <p className="text-left">
            Please make sure you email us proof of payment to{" "}
            <span className="font-bold">pickup@eazeewash.com</span> so we can
            process your order.
          </p>
        </div>
      </div>
    </div>
  );
}
