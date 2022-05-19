import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import useAuth from "../../../hooks/use-auth";
import { usePickupAddress } from "../../../hooks/pick-up-address";
import {
  createPickupAddress,
  updatePickupAddress,
} from "../../../features/cart/cartSlice";
import { addressFormSchema } from "./schema";
import FormInput from "../input-field";

export default function AddressForm({ callback }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const formMethods = useForm({
    resolver: yupResolver(addressFormSchema),
  });
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
        formMethods.setValue(addressField, pickupAddress[addressField])
      );
    }
  }, [pickupAddress, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submitAddress)}>
        <div className="flex flex-col space-y-2 items-end">
          <FormInput
            label="Street address:"
            fieldname="street_address"
            className="border-2 border-gray-300"
            type="text"
            id="street_address"
          />
        </div>

        <div className="flex flex-col space-y-2 items-end">
          <FormInput
            label="Unit/Complex number:"
            fieldname="unit_complex_number"
            className="border-2 border-gray-300"
            type="text"
            id="unit_complex_number"
          />
        </div>

        <div className="flex flex-col space-y-2 items-end">
          <FormInput
            label="Town/City:"
            fieldname="town_city"
            className="border-2 border-gray-300"
            type="text"
            id="town_city"
          />
        </div>

        <div className="flex flex-col space-y-2 items-end">
          <FormInput
            label="Province:"
            fieldname="province"
            className="border-2 border-gray-300"
            type="text"
            id="province"
          />
        </div>

        <div className="flex flex-col space-y-2 items-end">
          <FormInput
            label="Postal Code:"
            fieldname="postal_code"
            className="border-2 border-gray-300"
            type="text"
            id="postal_code"
          />
        </div>

        <div className="text-right mt-2">
          <button className="font-bold hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1">
            {pickupAddress?._id ? "Update address" : "Add address"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

AddressForm.prototypes = {
  callback: PropTypes.func.isRequired,
};
