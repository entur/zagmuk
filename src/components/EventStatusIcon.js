import React, { Component } from 'react';

import {
  ValidationErrorIcon,
  ValidationCheckIcon,
  ClockIcon,
  SettingsIcon,
  QuestionIcon,
} from '@entur/icons'

class EventStatusIcon extends Component {
  render() {
    switch (this.props.state) {
      case 'OK':
        return (
          <ValidationCheckIcon
            style={{ color: 'green', width: 22, height: 22 }}
          />
        );
      case 'PENDING':
        return (
          <ClockIcon
            style={{ color: 'orange', width: 22, height: 22 }}
          />
        );
      case 'STARTED':
        return (
          <SettingsIcon
            style={{ color: '#2274b5', width: 22, height: 22 }}
          />
        );
      case 'FAILED':
        return (
          <ValidationErrorIcon
            style={{ color: 'red', width: 22, height: 22 }}
          />
        );
      case 'CANCELLED':
        return (
          <ValidationErrorIcon
            style={{ color: 'orange', width: 22, height: 22 }}
          />
        );
      case 'DUPLICATE':
        return (
          <ValidationErrorIcon
            style={{ color: 'red', width: 22, height: 22 }}
          />
        );
      case 'IGNORED':
        return (
          <ClockIcon
            style={{ color: 'black', width: 22, height: 22 }}
          />
        );

      case 'TIMEOUT':
        return (
          <QuestionIcon
            style={{ color: 'red', width: 22, height: 22 }}
          />
        );
    }
    return <QuestionIcon style={{ color: 'grey', width: 22, height: 22 }} />;
  }
}

export default EventStatusIcon;
