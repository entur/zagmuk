import React from "react";
import { useConfig } from "../config/config";

const ChouetteLink = ({ action, id, referential, children }) => {
  const { chouetteBaseUrl } = useConfig();
  const baseURL = `${chouetteBaseUrl}referentials/`;

  const actionMap = {
    importer: `imports/${id}/compliance_check`,
    exporter: `exports/${id}/compliance_check`,
    validator: `compliance_checks/${id}/report`,
  };
  const URL = `${baseURL}${referential}/${actionMap[action]}`;

  return (
    <a title={URL} target="_blank" rel="noreferrer" href={URL}>
      {children}
    </a>
  );
};

export default ChouetteLink;
