import React from 'react';
import { useConfig } from '../config/config';

const UdugLink = ({ id, referential, navigate, children }) => {
  const { udugBaseUrl } = useConfig();
  const baseURL = `${udugBaseUrl}report/`;
  const URL = `${baseURL}${referential}/${id}`;

  return (
    <a title={URL} onClick={() => navigate(URL)}>
      {children}
    </a>
  );
};

export default UdugLink;
