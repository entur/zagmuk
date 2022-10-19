import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../App";
import { useConfig } from "../config/config";

const REFRESH_INTERVAL_MS = 5000;

export const useEvents = () => {
  const { timetableEventsApiUrl } = useConfig();
  const { providerId, getToken } = useContext(AppContext);

  const { isLoading, isError, data, error } = useQuery<any, Error>(
    ["events", providerId],
    async () => {
      const accessToken = await getToken!();
      const response = await fetch(
        `${timetableEventsApiUrl!}/${providerId ? providerId : ""}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
    {
      refetchInterval: REFRESH_INTERVAL_MS,
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
  };
};
