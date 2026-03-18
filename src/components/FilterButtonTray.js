import translations from "./actionTranslations";
import { ChoiceChip, ChoiceChipGroup } from "@entur/chip";
import { useRandomId } from "@entur/utils";

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
      <ChoiceChipGroup
        name={id}
        label={label}
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
