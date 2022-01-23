import React from "react";
import PropTypes from "prop-types";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classNames from "classnames";

export default function NavLink({ children, to, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        className={classNames(
          "font-semibold",
          match ? "text-blue-500 underline" : "text-gray-500 none"
        )}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};
