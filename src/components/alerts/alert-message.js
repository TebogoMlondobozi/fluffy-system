import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function AlertMessage({ alertMessage, isError }) {
  return alertMessage ? (
    <p
      className={classNames(
        "w-full text-center text-sm p-2 rounded-lg",
        isError ? "bg-red-100" : "bg-green-100"
      )}
    >
      {alertMessage}
    </p>
  ) : null;
}
AlertMessage.propTypes = {
  isError: PropTypes.bool,
  alertMessage: PropTypes.string,
};
