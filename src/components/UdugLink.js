import React from "react";
import { useConfig } from "../config/config";

const UdugLink = ({ id, referential, navigate, children, state }) => {
  const { udugBaseUrl } = useConfig();
  const baseURL = `${udugBaseUrl}report/`;
  const URL = `${baseURL}${referential}/${id}`;

  const onClick = (e) => {
    e.preventDefault();
    navigate(URL);
  };

  if (state === "STARTED" || state === "PENDING") {
    return children;
  }

  return (
    <a title={URL} href={URL} onClick={onClick}>
      {children}
    </a>
  );
};

export default UdugLink;
