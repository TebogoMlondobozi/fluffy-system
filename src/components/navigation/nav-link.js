import React from "react";
import PropTypes from "prop-types";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classNames from "classnames";

export default function NavLink({ children, to, className, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        className={classNames(
          "font-semibold text-white",
          match ? className || "text-sky-900" : "text-white"
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
  className: PropTypes.string,
};
