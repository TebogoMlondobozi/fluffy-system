import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function LoginForm({ signin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  const onSubmit = (logins) =>
    signin(logins, () =>
      navigate(location.state?.from?.pathname || "/shop", {
        replace: true,
      })
    );

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <h2>Enter login details to signin</h2>
          <div className="flex flex-col spacey-3">
            <div className="flex flex-col space-y-2">
              <label htmlFor="username">Username:</label>
              <input
                className="border-2"
                type="text"
                id="username"
                {...register("username", { required: true })}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password</label>
              <input
                className="border-2"
                type="password"
                id="password"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="font-bold hover:bg-blue-200 bg-blue-400 text-white rounded-lg p-1">
              Signin
            </button>
            <button
              className="font-bold hover:bg-blue-200 rounded-lg p-1"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  signin: PropTypes.func.isRequired,
};
