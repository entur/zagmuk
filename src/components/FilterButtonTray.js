import React, { Component } from "react";
import { SegmentedControl, SegmentedChoice } from "@entur/form";

import translations from "./actionTranslations";

class FilterButtonTray extends Component {
  render() {
    const { label, locale, activeButtonId, onChange, buttonConfig, translationKey } = this.props;

    return (
      <div style={this.props.style}>
        <SegmentedControl
          label={label}
          onChange={(selectedValue) => onChange(selectedValue)}
          selectedValue={activeButtonId}
        >
          {buttonConfig.fields.map((field) => (
            <SegmentedChoice
              key={field.id}
              value={field.id}
              style={{ whiteSpace: "nowrap" }}
            >
              {translations[locale][translationKey][field.id]}
            </SegmentedChoice>
          ))}
        </SegmentedControl>
      </div>
    );
  }
}

export default FilterButtonTray;
