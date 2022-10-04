import React from 'react';

const UdugLink = ({ id, referential, navigate, children }) => {
  const baseURL = `${window.config.udugBaseUrl}report/`;
  const URL = `${baseURL}${referential}/${id}`;

  return (
    <a title={URL} onClick={() => navigate(URL)}>
      {children}
    </a>
  );
};

export default UdugLink;
