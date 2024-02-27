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

import { useCallback } from "react";
import { Modal } from "@entur/modal";
import {
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from "@entur/button";
import { Paragraph } from "@entur/typography";

export const ConfirmFlexUploadDialog = ({
  open,
  handleClose,
  handleFlex,
  handleNonFlex,
}) => {
  const onFlex = useCallback(() => {
    handleFlex();
    handleClose();
  }, [handleFlex, handleClose]);

  const onNonFlex = useCallback(() => {
    handleNonFlex();
    handleClose();
  }, [handleNonFlex, handleClose]);

  return (
    <Modal
      title={"Last opp fleksible transportdatasett"}
      open={open}
      onDismiss={handleClose}
      size="medium"
    >
      <Paragraph>
        Er du sikker på at du ønsker å laste opp et fleksibelt
        transportdatasett?
      </Paragraph>
      <ButtonGroup>
        <PrimaryButton onClick={() => onFlex()}>
          Ja, last opp fleksibel linje
        </PrimaryButton>
        <SecondaryButton onClick={() => onNonFlex()}>
          Nei, last opp linje
        </SecondaryButton>
      </ButtonGroup>
    </Modal>
  );
};
