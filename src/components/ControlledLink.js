import React from "react";
import ChouetteLink from "./ChouetteLink";
import UdugLink from "./UdugLink";

const supportedUdugActions = [
  "PREVALIDATION",
  "EXPORT_NETEX_POSTVALIDATION",
  "EXPORT_NETEX_BLOCKS_POSTVALIDATION",
];

const ControlledLink = ({ events, includeLevel2, navigate, children }) => {
  let supportedChouetteActions = ["IMPORT", "VALIDATION_LEVEL_1"];

  let chouetteMap = {
    IMPORT: "importer",
    VALIDATION_LEVEL_1: "validator",
  };

  if (includeLevel2) {
    supportedChouetteActions.push("VALIDATION_LEVEL_2");
    supportedChouetteActions.push("EXPORT");
    supportedChouetteActions.push("EXPORT_NETEX");
    chouetteMap["VALIDATION_LEVEL_2"] = "validator";
    chouetteMap["EXPORT"] = "exporter";
    chouetteMap["EXPORT_NETEX"] = "exporter";
  }

  if (events.states && events.states.length) {
    const endState = events.states[events.states.length - 1];

    // chouetteJobId can refer to an external ID from either chouette or antu
    const externalId = endState.chouetteJobId;

    if (supportedChouetteActions.indexOf(endState.action) > -1 && externalId) {
      return (
        <ChouetteLink
          action={chouetteMap[endState.action]}
          id={endState.chouetteJobId}
          referential={endState.referential}
        >
          {children}
        </ChouetteLink>
      );
    } else if (
      supportedUdugActions.indexOf(endState.action) > -1 &&
      externalId
    ) {
      return (
        <UdugLink
          id={endState.chouetteJobId}
          referential={endState.referential}
          navigate={navigate}
          state={endState.state}
        >
          {children}
        </UdugLink>
      );
    }
  }

  return <div> {children} </div>;
};

export default ControlledLink;
