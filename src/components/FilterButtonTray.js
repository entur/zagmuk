import React, { Component } from "react";
import { SegmentedControl, SegmentedChoice } from "@entur/form";
import buttonConfig from "./buttonConfig";
import translations from "./actionTranslations";

class FilterButtonTray extends Component {
  render() {
    const { locale, activeButtonId, onChange } = this.props;

    return (
      <div style={this.props.style}>
        <SegmentedControl
          onChange={(selectedValue) => onChange(selectedValue)}
          selectedValue={activeButtonId}
        >
          {buttonConfig.fields.map((field) => (
            <SegmentedChoice
              key={field.id}
              value={field.id}
              style={{ whiteSpace: "nowrap" }}
            >
              {translations[locale].filterButton[field.id]}
            </SegmentedChoice>
          ))}
        </SegmentedControl>
      </div>
    );
  }
}

export default FilterButtonTray;
