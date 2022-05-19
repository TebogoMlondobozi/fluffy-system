import React from "react";
import PropTypes from "prop-types";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuth from "../../../hooks/use-auth";
import { signupFormSchema } from "./schema";
import FormInput from "../input-field";

export default function SignupForm({ callback }) {
  const { registerAccount } = useAuth();
  const formMethods = useForm({
    resolver: yupResolver(signupFormSchema),
  });

  const onSubmit = (accountInfo) =>
    registerAccount(accountInfo, (message) => {
      if (message) {
        callback(message);
      }
    });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <h2>Enter the following details to have account with us</h2>
          <div className="flex flex-col spacey-3">
            <div className="flex flex-col space-y-2">
              <FormInput
                label="First name:"
                fieldname="firstname"
                className="border-2"
                type="text"
                id="firstname"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <FormInput
                label="Last name:"
                fieldname="lastname"
                className="border-2"
                type="text"
                id="lastname"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <FormInput
                label="Mobile number:"
                fieldname="mobile_number"
                className="border-2"
                type="text"
                id="mobile_number"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <FormInput
                label="Email address:"
                fieldname="email_address"
                className="border-2"
                type="email"
                id="email_address"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <FormInput
                label="Password:"
                fieldname="password"
                className="border-2"
                type="password"
                id="password"
              />
            </div>
          </div>
          <div className="space-4">
            <button className="font-bold hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1">
              Create account
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

SignupForm.prototypes = {
  callback: PropTypes.func.isRequired,
};
