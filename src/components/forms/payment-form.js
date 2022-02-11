import React, { useRef } from "react";
import PropTypes from "prop-types";

import useAuth from "../../hooks/use-auth";
import { useForm } from "react-hook-form";
import { config } from "../../config";

export default function PaymentForm({ order }) {
  const { payfast } = config(process.env.NODE_ENV);
  const { register } = useForm();
  const formRef = useRef();
  const { user } = useAuth();

  return order ? (
    <div className="text-center flex-1 p-10">
      <h2 className="pb-2">Card Payment</h2>
      <div className="flex flex-col items-center bg-gray-100 rounded-lg">
        <div>
          <p className="text-left p-8">
            For accepting card payments, we have partnered with PayFast. Please
            checkout to be directed to the Payfast payment page to complete your
            order.
          </p>
        </div>
        <div className="flex items-center justify-center w-full pb-5">
          <form
            className="rounded-lg h-10 bg-blue-400 flex items-center justify-center space-y-1 hover:cursor-pointer"
            ref={formRef}
            action={payfast.live_url}
            method="post"
          >
            <input
              type="hidden"
              name="merchant_id"
              value={payfast.merchant_id}
              {...register("merchant_id")}
            />
            <input
              type="hidden"
              name="merchant_key"
              value={payfast.merchant_key}
              {...register("merchant_key")}
            />
            <input
              type="hidden"
              name="return_url"
              value={payfast.return_url}
              {...register("return_url")}
            />
            <input
              type="hidden"
              name="cancel_url"
              value={payfast.cancel_url}
              {...register("cancel_url")}
            />
            <input
              type="hidden"
              name="notify_url"
              value={payfast.notify_url}
              {...register("notify_url")}
            />

            {/*Customer details */}
            <input
              type="hidden"
              name="name_first"
              value={user.firstname}
              {...register("name_first")}
            />
            <input
              type="hidden"
              name="name_last"
              value={user.lastname}
              {...register("name_last")}
            />
            <input
              type="hidden"
              name="email_address"
              value={user.emailAddress}
              {...register("email_address")}
            />
            <input
              type="hidden"
              name="cell_number"
              value={user.mobileNumber}
              {...register("cell_number")}
            />

            {/*Order deatils*/}
            <input
              type="hidden"
              name="amount"
              value={order.items.reduce(
                (acc, { qty, unit_price }) =>
                  parseFloat(unit_price) * parseInt(qty) + acc,
                0
              )}
              {...register("amount")}
            />
            <input
              type="hidden"
              name="item_name"
              value={
                order.items.length > 1
                  ? `Order Id:${order._id}`
                  : order.items[0].name
              }
              {...register("item_name")}
            />
            <input
              type="hidden"
              name="item_description"
              value={
                order.items.length > 1
                  ? `${user.firstname}, order placed has ${order.items.length} items`
                  : order.items[0].description
              }
              {...register("item_description")}
            />

            <input
              type="hidden"
              name="email_confirmation"
              value={1}
              {...register("email_confirmation")}
            />
            <input
              type="hidden"
              name="confirmation_address"
              value={user.emailAddress}
              {...register("confirmation_address")}
            />
            <input
              type="hidden"
              name="payment_method"
              {...register("payment_method")}
            />
            <input
              type="hidden"
              name="custom_str1"
              value={order._id}
              {...register("custom_str1")}
            />
            <input
              type="hidden"
              name="custom_str2"
              value={user._id}
              {...register("custom_str2")}
            />
            <input
              className="hover:cursor-pointer text-white font-bold"
              type="submit"
              value="Make Payment"
            />
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
PaymentForm.propTypes = {
  order: PropTypes.object,
};
