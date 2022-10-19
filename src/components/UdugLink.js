import { Link } from '@entur/typography';
import React from 'react';
import { useConfig } from '../config/config';

const UdugLink = ({ id, referential, navigate, children }) => {
  const { udugBaseUrl } = useConfig();
  const baseURL = `${udugBaseUrl}report/`;
  const URL = `${baseURL}${referential}/${id}`;

  return (
    <Link title={URL} onClick={() => navigate(URL)}>
      {children}
    </Link>
  );
};

export default UdugLink;
