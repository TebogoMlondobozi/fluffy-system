import React from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuth from "../../../hooks/use-auth";
import { signupFormSchema } from "./schema";

export default function SignupForm({ callback }) {
  const { registerAccount } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupFormSchema),
  });

  const onSubmit = (accountInfo) =>
    registerAccount(accountInfo, (message) => {
      if (message) {
        callback(message);
      }
    });

  console.log("Errors......", errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-4">
        <h2>Enter the following details to have account with us</h2>
        <div className="flex flex-col spacey-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor="firstname">First name:</label>
            <>
              {errors?.firstname?.message && (
                <p className="text-sm text-red-500">
                  {errors.firstname.message}
                </p>
              )}
              <input
                className="border-2"
                type="text"
                id="firstname"
                {...register("firstname")}
              />
            </>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="lastname">Last name:</label>
            <>
              {errors?.lastname?.message && (
                <p className="text-sm text-red-500">
                  {errors.lastname.message}
                </p>
              )}
              <input
                className="border-2"
                type="text"
                id="lastname"
                {...register("lastname")}
              />
            </>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="mobile_number">Mobile number:</label>
            <>
              {errors?.mobile_number?.message && (
                <p className="text-sm text-red-500">
                  {errors.mobile_number.message}
                </p>
              )}
              <input
                className="border-2"
                type="text"
                id="mobile_number"
                {...register("mobile_number")}
              />
            </>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email_address">Email address:</label>
            <>
              {errors?.email_address?.message && (
                <p className="text-sm text-red-500">
                  {errors.email_address.message}
                </p>
              )}
              <input
                className="border-2"
                type="email"
                id="email_address"
                {...register("email_address")}
              />
            </>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Password:</label>
            <>
              {errors?.password?.message && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <input
                className="border-2"
                type="password"
                id="password"
                {...register("password")}
              />
            </>
          </div>
        </div>
        <div>
          <button className="font-bold hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1">
            Create account
          </button>
        </div>
      </div>
    </form>
  );
}

SignupForm.prototypes = {
  callback: PropTypes.func.isRequired,
};
