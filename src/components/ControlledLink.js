import React from "react";
import UdugLink from "./UdugLink";

const supportedUdugActions = [
  "PREVALIDATION",
  "EXPORT_NETEX_POSTVALIDATION",
  "EXPORT_NETEX_MERGED_POSTVALIDATION",
  "EXPORT_NETEX_BLOCKS_POSTVALIDATION",
];

const ControlledLink = ({ events, navigate, children }) => {
  if (events.states && events.states.length) {
    const endState = events.states[events.states.length - 1];

    // chouetteJobId can refer to an external ID from either chouette or antu
    const externalId = endState.chouetteJobId;

    if (
      supportedUdugActions.indexOf(endState.action) > -1 &&
      externalId &&
      endState.state !== "STARTED" &&
      endState.state !== "PENDING"
    ) {
      return (
        <UdugLink
          id={endState.chouetteJobId}
          referential={endState.referential}
          navigate={navigate}
        >
          {children}
        </UdugLink>
      );
    }
  }

  return <div> {children} </div>;
};

export default ControlledLink;
