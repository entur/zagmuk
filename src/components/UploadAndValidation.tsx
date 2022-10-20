import { ButtonGroup, SecondaryButton } from "@entur/button";
import { UploadIcon } from "@entur/icons";
import { useState } from "react";
import { ConfirmValidateDialog } from "./ConfirmValidateDialog";
import { FileUploadDialog } from "./FileUploadDialog";

export const UploadAndValidation = () => {
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [confirmValidateDialogOpen, setConfirmValidateDialogOpen] = useState(false);
  return (
    <>
      <ButtonGroup>
        <SecondaryButton onClick={() => setFileUploadDialogOpen(true)}>
          Last opp nytt datasett <UploadIcon />
        </SecondaryButton>
        <SecondaryButton onClick={() => setConfirmValidateDialogOpen(true)}>Valider datasett</SecondaryButton>
      </ButtonGroup>
      <FileUploadDialog isModalOpen={fileUploadDialogOpen} setModalOpen={setFileUploadDialogOpen} />
      <ConfirmValidateDialog open={confirmValidateDialogOpen} handleClose={() => setConfirmValidateDialogOpen(false)} />
    </>
  );
};
