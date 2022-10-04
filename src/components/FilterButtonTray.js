import React, { Component } from 'react';
import FilterButton from './FilterButton';
import buttonConfig from './buttonConfig';
import translations from './actionTranslations';

class FilterButtonTray extends Component {

  render() {
    const { locale, activeButtonId, onChange } = this.props;

    return (
      <div style={this.props.style}>
        {buttonConfig.fields.map(field =>
          <FilterButton
            active={activeButtonId === field.id}
            id={field.id}
            handleClick={() => { onChange(field.id) }}
            key={'filter-button-' + field.id}
            label={translations[locale].filterButton[field.id]}
          />
        )}
      </div>
    );
  }
}

export default FilterButtonTray;
