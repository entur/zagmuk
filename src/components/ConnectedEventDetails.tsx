import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useConfig } from "../config/config";

export const ConnectedEventDetails = ({providerId, children}: {providerId?: string, children: Function}) => {
  const [eventDetails, setEventDetails] = useState<any>(null);
  const {timetableEventsApiUrl} = useConfig();
  const auth = useAuth0();
  useEffect(() => {
    const fetchEventDetails = async () => {
      const accessToken = await auth.getAccessTokenSilently();

      const response = await fetch(`${timetableEventsApiUrl!}/${providerId ? providerId : ''}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      setEventDetails(data);
    }
    if (timetableEventsApiUrl) {
      fetchEventDetails();
    }
  }, [timetableEventsApiUrl, providerId, auth]);

  return children(eventDetails);
}