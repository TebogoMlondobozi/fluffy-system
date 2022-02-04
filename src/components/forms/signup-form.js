import React from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import useAuth from "../../hooks/use-auth";

export default function SignupForm({ callback }) {
  const { registerAccount } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = (accountInfo) =>
    registerAccount(accountInfo, (message) => {
      if (message) {
        callback(message);
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-4">
        <h2>Enter the following details to have account with us</h2>
        <div className="flex flex-col spacey-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor="firstname">First name:</label>
            <input
              className="border-2"
              type="text"
              id="firstname"
              {...register("firstname", { required: true })}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="lastname">Last name:</label>
            <input
              className="border-2"
              type="text"
              id="lastname"
              {...register("lastname", { required: true })}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="mobile_number">Mobile number:</label>
            <input
              className="border-2"
              type="text"
              id="mobile_number"
              {...register("mobile_number", { required: true })}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email_address">Email address:</label>
            <input
              className="border-2"
              type="email"
              id="email_address"
              {...register("email_address", { required: true })}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Password:</label>
            <input
              className="border-2"
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
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
