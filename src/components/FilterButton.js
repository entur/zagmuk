import React, { Component } from 'react';

class FilterButton extends Component {
  handleClick() {
    const { handleClick, id } = this.props;
    if (handleClick && typeof handleClick === 'function') {
      handleClick(id);
    }
  }

  render() {
    const { label, active } = this.props;
    const activeStyle = {
      background: '#2196F3',
      color: '#fff',
      border: '1px solid #15599d'
    };
    const inactiveStyle = {
      background: '#fff',
      color: '#000',
      border: '1px solid #d8d8d8'
    };
    const defaultStyle = {
      padding: '0.2em 0.4em',
      fontSize: '0.9em',
      cursor: 'pointer',
      borderRadius: '5%',
      minWidth: 40,
      marginLeft: 10
    };

    const buttonStyle = Object.assign(
      defaultStyle,
      active ? activeStyle : inactiveStyle
    );

    return (
      <button style={buttonStyle} onClick={() => this.handleClick()}>
        <div style={{ pointerEvents: 'none', textAlign: 'center' }}>
          {label}
        </div>
      </button>
    );
  }
}
export default FilterButton;
