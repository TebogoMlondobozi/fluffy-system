import React from "react";
import PropTypes from "prop-types";

export default function ExternalLink({ text, link }) {
  return (
    <a
      className="hover:text-blue-500"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  );
}

ExternalLink.propTyoes = {
  text: PropTypes.string,
  link: PropTypes.string,
};
