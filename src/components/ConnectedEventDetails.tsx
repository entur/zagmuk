import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "@entur/loader";
import { useCallback, useEffect, useState } from "react";
import { useConfig } from "../config/config";
import EventDetails from "./EventDetails";

export const ConnectedEventDetails = ({providerId}: {providerId?: string}) => {
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState<any>(null);
  const {timetableEventsApiUrl} = useConfig();
  const auth = useAuth0();

  const fetchEventDetails = useCallback(async () => {
    setLoading(true);
    const accessToken = await auth.getAccessTokenSilently();
    const response = await fetch(`${timetableEventsApiUrl!}/${providerId ? providerId : ''}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    setEventDetails(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (timetableEventsApiUrl) {
      fetchEventDetails();
    }
  }, [timetableEventsApiUrl, providerId, auth]);

  return loading ? (
      <Loader>Loading events...</Loader>
    ) : (
      <EventDetails
        handleRefresh={() => fetchEventDetails()}
        navigate={() => {}} // todo: implement
        locale="en"
        dataSource={eventDetails}
        showDateFilter
        showNewDeliveriesFilter
        hideIgnoredExportNetexBlocks={false}
        hideAntuValidationSteps={false}
      />
    );
}