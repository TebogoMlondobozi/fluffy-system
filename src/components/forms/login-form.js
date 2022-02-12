import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AlertMessage from "../alerts/alert-message";

export default function LoginForm({ signin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const [alert, setAlert] = useState({});

  const onSubmit = async (logins) => {
    await signin(logins, ({ message, success }) => {
      setAlert({ success, message });
      if (success)
        setTimeout(
          () =>
            navigate(location.state?.from?.pathname || "/shop", {
              replace: true,
            }),
          2000
        );
    });
  };

  return (
    <div className="flex flex-col items-center">
      <AlertMessage alertMessage={alert.message} isError={!alert.success} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <h2 className="text-md font-semibold">Enter your login details:</h2>
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
