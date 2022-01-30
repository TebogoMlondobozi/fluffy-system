import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { PageLayout } from "../../components/structure";
import {
  createPickupAddress,
  updatePickupAddress,
} from "../../features/cart/cartSlice";
import { usePickupAddress } from "../../hooks/pick-up-address";
import useAuth from "../../hooks/use-auth";
import useOrder from "../../hooks/use-order";
import useOrderId from "../../hooks/use-order-id";

export default function Payment() {
  const { user } = useAuth();
  const { orderId } = useOrderId();
  const order = useOrder(orderId);

  const { pickupAddress, mutate } = usePickupAddress({ userId: user?._id });
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: pickupAddress || {},
  });

  const dispatch = useDispatch();

  const submitAddress = async (addressInfo) => {
    try {
      if (pickupAddress?._id) {
        // address update request
        dispatch(
          updatePickupAddress({
            addressId: pickupAddress._id,
            addressInfo,
            mutate,
          })
        );
      } else {
        //create new address request
        dispatch(
          createPickupAddress({
            userId: user._id,
            addressInfo,
            mutate,
          })
        );
      }
    } catch (e) {
      console.log("Failed address submit/update");
    }
  };

  useEffect(() => {
    if (pickupAddress) {
      [
        "postal_code",
        "province",
        "street_name",
        "town_city",
        "unit_complex_number",
      ].forEach((addressField) =>
        setValue(addressField, pickupAddress[addressField])
      );
    }
  }, [pickupAddress, setValue]);

  return (
    <PageLayout>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="font-bold">Order Items</h2>

          {!order ? (
            <div className="p-4 rounded-lg bg-gray-300 w-full h-1/2 flex items-center justify-center">
              <div>
                <p className="font-bold">
                  Oops, you have not placed an order yet, please{" "}
                  <span className="text-blue-500">
                    <NavLink to="/shop">visit shop</NavLink>
                  </span>{" "}
                  to add items to your cart.
                </p>
              </div>
            </div>
          ) : (
            <table>
              <thead className="text-left">
                <tr className="grid grid-cols-5 grid-flow-x gap-x-4 bg-gray-200">
                  <th>Name</th>
                  <th className="start-col-2 col-span-2">Description</th>
                  <th>Quantity</th>
                  <th>Sub total</th>
                </tr>
              </thead>

              <tbody>
                {(order.items || []).map((item) => {
                  return (
                    <tr className="grid grid-cols-5 grid-flow-x gap-x-4">
                      <td>{item.name}</td>
                      <td className="start-col-2 col-span-2">
                        {item.description}
                      </td>
                      <td>{item.qty}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="text-right">
          <h2 className="font-bold">Your Pickup address</h2>

          <form onSubmit={handleSubmit(submitAddress)}>
            <div className="flex flex-col space-y-2 items-end">
              <label htmlFor="text-left street_address">Street address:</label>
              <input
                className="border-2 border-gray-300"
                type="text"
                id="street_address"
                {...register("street_name", { required: true })}
              />
            </div>

            <div className="flex flex-col space-y-2 items-end">
              <label htmlFor="text-left street_address">
                Unit/Complex number:
              </label>
              <input
                className="border-2 border-gray-300"
                type="text"
                id="unit_complex_number"
                {...register("unit_complex_number")}
              />
            </div>

            <div className="flex flex-col space-y-2 items-end">
              <label htmlFor="town_city">Town/City:</label>
              <input
                className="border-2 border-gray-300"
                type="text"
                id="town_city"
                {...register("town_city", { required: true })}
              />
            </div>

            <div className="flex flex-col space-y-2 items-end">
              <label htmlFor="province">Province:</label>
              <input
                className="border-2 border-gray-300"
                type="text"
                id="province"
                {...register("province", { required: true })}
              />
            </div>

            <div className="flex flex-col space-y-2 items-end">
              <label htmlFor="postal_code">Postal Code:</label>
              <input
                className="border-2 border-gray-300"
                type="text"
                id="postal_code"
                {...register("postal_code", { required: true })}
              />
            </div>

            <div className="text-right mt-2">
              <button className="font-bold hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1">
                {pickupAddress?._id ? "Update address" : "Add address"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-4">
        <h2 className="text-center font-semibold">Select Payment Method:</h2>
        <div className="flex justify-between border-2 border-dotted">
          <div className="text-center flex-1">
            <h2>Card Payment</h2>
          </div>
          <div className="text-center flex-1">
            <h2>EFT Payment</h2>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
