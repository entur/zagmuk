import translations from "./actionTranslations";
import { ChoiceChip, ChoiceChipGroup } from "@entur/chip";
import { useRandomId } from "@entur/utils";
import { Label } from "@entur/typography";

const FilterButtonTray = ({
  label,
  locale,
  activeButtonId,
  onChange,
  buttonConfig,
  translationKey,
}) => {
  const id = useRandomId();
  return (
    <div
      style={{ marginRight: "1rem", marginLeft: "1rem", marginBottom: "20px" }}
    >
      <div style={{ marginBottom: "0.5rem" }}>
        <Label>{label}</Label>
      </div>
      <ChoiceChipGroup
        name={id}
        onChange={(e) => onChange(e.target.value)}
        value={activeButtonId}
      >
        {buttonConfig.fields.map((field) => (
          <ChoiceChip key={field.id} value={field.id}>
            {translations[locale][translationKey][field.id]}
          </ChoiceChip>
        ))}
      </ChoiceChipGroup>
    </div>
  );
};

export default FilterButtonTray;
