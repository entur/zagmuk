import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import { useConfig } from "../config/config";

export const useValidateDatasetMutation = () => {
  const { timetableAdminApiUrl } = useConfig();
  const { getToken, providerId } = useContext(AppContext);
  const url = `${timetableAdminApiUrl}/${providerId}/validate`;

  const mutation = useMutation(async () => {
    const accessToken = await getToken!();

    await axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });

  return {
    mutation,
  };
};
