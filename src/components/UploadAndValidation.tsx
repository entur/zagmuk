import { ButtonGroup, SecondaryButton } from "@entur/button"
import { UploadIcon } from "@entur/icons"

export const UploadAndValidation = () => {
  return (
    <ButtonGroup>
      <SecondaryButton>Last opp nytt datasett <UploadIcon /></SecondaryButton>
      <SecondaryButton>Valider datasett</SecondaryButton>
    </ButtonGroup>
  )
}