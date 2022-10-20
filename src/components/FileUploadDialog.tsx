/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

import { useDropzone } from "react-dropzone";
import { Modal } from "@entur/modal";
import { PrimaryButton } from "@entur/button";
import { CheckIcon, ValidationErrorIcon } from "@entur/icons";
import { Loader } from "@entur/loader";
import "./fileUpload.css";
import {
  FileUploadState,
  useFileUploadMutation,
} from "./useFileUploadMutation";

const formatFileSize = (size: number) => {
  if (size > 1024) {
    return `${(size / 1024).toFixed(2)} Mb`;
  }
  return `${size.toFixed(2)} Kb`;
};

interface Props {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export const FileUploadDialog = ({ isModalOpen, setModalOpen }: Props) => {
  const { mutation, progress, fileUploadState } = useFileUploadMutation();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/zip": [".zip", ".rar"],
    },
    multiple: true,
  });

  const totalFileSize = acceptedFiles.length
    ? acceptedFiles.map((file) => file.size / 1024).reduce((f1, f2) => f1 + f2)
    : 0;

  return (
    <Modal
      open={isModalOpen}
      onDismiss={() => setModalOpen(false)}
      title="Last opp nytt datasett"
      size="medium"
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>
          Slipp filer her, eller klikk her for å velge filer som skal lastes opp
          som et nytt datasett. Kun filer på formatet zip og rar er støttet.
        </p>
      </div>
      <div className="filelist">
        <select className="file-select" multiple>
          {acceptedFiles.map((file, index) => {
            return <option key={"file-" + index}>{file.name}</option>;
          })}
        </select>
      </div>
      {fileUploadState === FileUploadState.COMPLETED ? (
        <div
          style={{
            maxWidth: "65%",
            margin: "20px auto",
            display: "flex",
            padding: 10,
            background: "rgba(0, 128, 0, 0.1)",
            alignItems: "middle",
          }}
        >
          <CheckIcon color="green" />{" "}
          <div
            style={{
              marginLeft: 5,
              textTransform: "uppercase",
              position: "relative",
              top: 3,
            }}
          >
            Datasett er lastet opp
          </div>
        </div>
      ) : null}
      {fileUploadState === FileUploadState.FAILED ? (
        <div
          style={{
            maxWidth: "65%",
            textAlign: "center",
            margin: "20px auto",
            display: "flex",
            padding: 10,
            background: "rgba(255, 0, 0, 0.05)",
            alignItems: "middle",
          }}
        >
          <ValidationErrorIcon color="red" />{" "}
          <div
            style={{
              marginLeft: 5,
              textTransform: "uppercase",
              position: "relative",
              top: 3,
            }}
          >
            Feil ved opplasting av datasett
          </div>
        </div>
      ) : null}
      <div style={{ maxWidth: "75%", margin: "20px auto" }}>
        {fileUploadState !== FileUploadState.NOT_STARTED ? (
          <Loader progress={progress} />
        ) : null}
      </div>
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontSize: "0.9em",
            visibility: totalFileSize ? "visible" : "hidden",
          }}
        >
          Total størrelse: {formatFileSize(totalFileSize)}
        </div>
        <PrimaryButton
          style={{ marginRight: 10 }}
          disabled={!acceptedFiles.length}
          onClick={() => {
            mutation.mutate(acceptedFiles);
          }}
        >
          Last opp datasett
        </PrimaryButton>
      </div>
    </Modal>
  );
};
