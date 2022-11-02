import { Loader } from "@entur/loader";
import { useContext } from "react";
import { AppContext } from "../App";
import EventDetails from "./EventDetails";
import { useEvents } from "./useEvents";

export const ConnectedEventDetails = () => {
  const { isLoading, isError, data, error } = useEvents();

  const { locale, hideAntuValidationSteps, hideIgnoredExportNetexBlocks, navigate } = useContext(AppContext);

  if (isLoading) {
    return <Loader>Loading events...</Loader>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      <EventDetails
        navigate={navigate}
        locale={locale}
        dataSource={data}
        showDateFilter
        showNewDeliveriesFilter
        hideIgnoredExportNetexBlocks={hideIgnoredExportNetexBlocks}
        hideAntuValidationSteps={hideAntuValidationSteps}
      />
    </>
  );
};
