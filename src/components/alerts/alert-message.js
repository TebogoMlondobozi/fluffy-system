import React from "react";
import PropTypes from "prop-types";

export default function AlertMessage({ alertMessage }) {
  return alertMessage ? (
    <p className="text-center text-sm bg-green-100 p-2 rounded-lg">
      {alertMessage}
    </p>
  ) : null;
}
AlertMessage.propTypes = {
  alertMessage: PropTypes.string,
};
