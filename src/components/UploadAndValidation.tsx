import { ButtonGroup, PrimaryButton, SecondaryButton } from "@entur/button";
import { UploadIcon } from "@entur/icons";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { FileUploadDialog } from "./FileUploadDialog";
import { ConfirmValidateDialog } from "./ConfirmValidateDialog";

export const UploadAndValidation = () => {
  const { providerId } = useContext(AppContext);
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
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
            onClick={() => setFileUploadDialogOpen(true)}
          >
            Last opp nytt datasett <UploadIcon />
          </PrimaryButton>

          <SecondaryButton onClick={() => setConfirmValidateDialogOpen(true)}>
            Valider datasett
          </SecondaryButton>
        </ButtonGroup>
      </div>
      <FileUploadDialog
        isModalOpen={fileUploadDialogOpen}
        setModalOpen={setFileUploadDialogOpen}

      />
      <ConfirmValidateDialog
        open={confirmValidateDialogOpen}
        handleClose={() => setConfirmValidateDialogOpen(false)}
      />
    </>
  );
};
