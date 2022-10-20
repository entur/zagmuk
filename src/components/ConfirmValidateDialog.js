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

import React, { Component } from "react";
import { Modal } from "@entur/modal";
import { ButtonGroup, PrimaryButton, SecondaryButton } from "@entur/button";
import { Paragraph } from "@entur/typography";

export class ConfirmValidateDialog extends Component {
  render() {
    const { open, handleClose } = this.props;

    return (
      <Modal
        title={"Validere datasett"}
        open={open}
        onDismiss={handleClose}
        size="small"
      >
        <Paragraph>Er du sikker på at du vil validere ditt datasett nå?</Paragraph>
        <ButtonGroup>
          <SecondaryButton onClick={handleClose}>Avbryt</SecondaryButton>
          <PrimaryButton onClick={() => {}}>Valider</PrimaryButton>
        </ButtonGroup>
      </Modal>
    );
  }
}
