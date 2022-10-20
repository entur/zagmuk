import { ButtonGroup, SecondaryButton } from "@entur/button";
import { UploadIcon } from "@entur/icons";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { ConfirmValidateDialog } from "./ConfirmValidateDialog";
import { FileUploadDialog } from "./FileUploadDialog";

export const UploadAndValidation = () => {
  const { providerId } = useContext(AppContext);
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [confirmValidateDialogOpen, setConfirmValidateDialogOpen] = useState(false);

  if (!providerId) {
    return null;
  }

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
