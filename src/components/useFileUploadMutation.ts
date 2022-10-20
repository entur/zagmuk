import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { useConfig } from "../config/config";

export enum FileUploadState {
  NOT_STARTED,
  STARTED,
  COMPLETED,
  FAILED,
}

export const useFileUploadMutation = () => {
  const { timetableAdminApiUrl } = useConfig();
  const { getToken, providerId } = useContext(AppContext);
  const url = `${timetableAdminApiUrl}/${providerId}/files`;

  const [fileUploadState, setFileUploadState] = useState<FileUploadState>(
    FileUploadState.NOT_STARTED
  );
  const [progress, setProgress] = useState(0);

  const mutation = useMutation(async (files: File[]) => {
    setFileUploadState(FileUploadState.STARTED);
    const accessToken = await getToken!();

    const data = new FormData();

    files.forEach((file) => {
      data.append("files", file);
    });

    try {
      await axios.post(url, data, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted =
            (progressEvent.loaded / progressEvent.total!) * 100;
          setProgress(percentCompleted);
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setFileUploadState(FileUploadState.COMPLETED);
    } catch (e) {
      setFileUploadState(FileUploadState.FAILED);
      throw e;
    }
  });

  return {
    mutation,
    progress,
    fileUploadState,
  };
};
