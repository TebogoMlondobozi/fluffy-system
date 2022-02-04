import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createPickupAddress,
  updatePickupAddress,
} from "../../features/cart/cartSlice";
import { usePickupAddress } from "../../hooks/pick-up-address";
import useAuth from "../../hooks/use-auth";

export default function AddressForm({ callback }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const { pickupAddress, mutate } = usePickupAddress({ userId: user?._id });

  const submitAddress = async (addressInfo) => {
    try {
      if (pickupAddress?._id) {
        // address update request
        dispatch(
          updatePickupAddress({
            addressId: pickupAddress._id,
            addressInfo,
            onSuccess: ({ message }) => {
              callback(message);
            },
          })
        );
      } else {
        //create new address request
        dispatch(
          createPickupAddress({
            userId: user._id,
            addressInfo,
            onSuccess: ({ message }) => {
              callback(message);
            },
          })
        );
      }
    } catch (e) {
      console.log("Failed address submit/update");
    } finally {
      setTimeout(() => {
        callback();
      }, 2000);
      mutate();
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
        <label htmlFor="text-left street_address">Unit/Complex number:</label>
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
  );
}

AddressForm.prototypes = {
  callback: PropTypes.func.isRequired,
};
