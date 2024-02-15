import { ButtonGroup, PrimaryButton, SecondaryButton } from "@entur/button";
import { UploadIcon } from "@entur/icons";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { FileUploadDialog } from "./FileUploadDialog";
import { ConfirmValidateDialog } from "./ConfirmValidateDialog";

export const UploadAndValidation = () => {
  const { providerId, hideFlexDataImport = true } = useContext(AppContext);
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [flexDataset, setFlexDataset] = useState(false);
  const [confirmValidateDialogOpen, setConfirmValidateDialogOpen] =
    useState(false);

  if (!providerId) {
    return null;
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonGroup>
          <PrimaryButton
            onClick={() => {
              setFlexDataset(false);
              setFileUploadDialogOpen(true);
            }}
          >
            Last opp nytt datasett <UploadIcon />
          </PrimaryButton>

          <SecondaryButton onClick={() => setConfirmValidateDialogOpen(true)}>
            Valider datasett
          </SecondaryButton>
        </ButtonGroup>
        <ButtonGroup>
          {!hideFlexDataImport && (
            <PrimaryButton
              style={{ backgroundColor: "rgb(69, 118, 69)" }}
              onClick={() => {
                setFlexDataset(true);
                setFileUploadDialogOpen(true);
              }}
            >
              Last opp nytt flex datasett <UploadIcon />
            </PrimaryButton>
          )}
        </ButtonGroup>
      </div>
      <FileUploadDialog
        isModalOpen={fileUploadDialogOpen}
        setModalOpen={setFileUploadDialogOpen}
        isFlexDataset={flexDataset}
      />
      <ConfirmValidateDialog
        open={confirmValidateDialogOpen}
        handleClose={() => setConfirmValidateDialogOpen(false)}
      />
    </>
  );
};
