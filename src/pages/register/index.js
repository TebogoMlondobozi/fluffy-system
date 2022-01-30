import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/structure";
import useAuth from "../../hooks/use-auth";

export default function Register() {
  const { registerAccount } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (accountInfo) =>
    registerAccount(accountInfo, () =>
      navigate("/profile", {
        replace: true,
      })
    );

  return (
    <PageLayout>
      <div
        className="flex flex-col items-center"
        style={{ margin: "20px auto" }}
      >
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
      </div>
    </PageLayout>
  );
}
