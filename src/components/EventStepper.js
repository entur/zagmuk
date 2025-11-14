import React from "react";
import PropTypes from "prop-types";
import ActionTranslations from "./actionTranslations";
import { DownArrowIcon, UpArrowIcon } from "@entur/icons";
import ControlledLink from "./ControlledLink";
import translations from "./translations";
import EventStatusIcon from "./EventStatusIcon";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import { nb } from "date-fns/locale";
import formatDuration from "date-fns/formatDuration";
import * as duration from "duration-fns";

const NETEX_BLOCKS_EVENTS = [
  "EXPORT_NETEX_BLOCKS",
  "EXPORT_NETEX_BLOCKS_POSTVALIDATION",
];

const ANTU_VALIDATION_EVENTS = [
  "PREVALIDATION",
  "EXPORT_NETEX_POSTVALIDATION",
  "EXPORT_NETEX_MERGED_POSTVALIDATION",
  "EXPORT_NETEX_BLOCKS_POSTVALIDATION",
];

class EventStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  static propTypes = {
    groups: PropTypes.object.isRequired,
    listItem: PropTypes.object.isRequired,
  };

  eventStates() {
    return [
      "FILE_TRANSFER",
      "FILE_CLASSIFICATION",
      "FILE_DELIVERY",
      "PREVALIDATION",
      "IMPORT",
      "VALIDATION_LEVEL_1",
      "DATASPACE_TRANSFER",
      "VALIDATION_LEVEL_2",
      "EXPORT_NETEX",
      "EXPORT_NETEX_POSTVALIDATION",
      "EXPORT_NETEX_MERGED_POSTVALIDATION",
      "EXPORT_NETEX_BLOCKS",
      "EXPORT",
      "OTP2_BUILD_GRAPH",
      "EXPORT_NETEX_BLOCKS_POSTVALIDATION",
    ];
  }

  addUnlistedStates(groups) {
    const states = this.eventStates();

    let groupsWithUnlisted = Object.assign({}, groups);

    let firstStateFound = false;

    states.forEach((state) => {
      if (!groupsWithUnlisted[state]) {
        groupsWithUnlisted[state] = {
          endState: "IGNORED",
          missingBeforeStartStart: !firstStateFound,
        };
      } else {
        firstStateFound = true;
      }
    });

    let finalGroups = {};

    Object.keys(groupsWithUnlisted)
      .sort((key1, key2) => states.indexOf(key1) - states.indexOf(key2))
      .forEach((key) => {
        finalGroups[key] = groupsWithUnlisted[key];
      });
    return finalGroups;
  }

  handleToggleVisibility() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  createCombinedSplit(formattedGroups, groups, name) {
    const combined = [];
    for (let i in groups) {
      const group = groups[i];
      combined[group] = formattedGroups[group];

      if (name !== group) {
        delete formattedGroups[group];
      }
    }
    formattedGroups[name] = combined;
  }

  aggreggateFileEvents(data) {
    let groups = { ...data };
    let endState = null;
    let errorOn = null;
    Object.keys(groups).forEach((group) => {
      if (group === "FILE_CLASSIFICATION" || group === "FILE_TRANSFER") {
        endState = groups[group].endState;

        if (endState === "FAILED" || endState === "DUPLICATE") {
          errorOn = group;
        }
        delete groups[group];
      }
    });

    if (endState !== null) {
      groups.FILE_DELIVERY = {
        endState: errorOn ? "FAILED" : endState,
        errorOn,
        missingBeforeStartStart: endState === "IGNORED" && !errorOn,
      };
    }
    return groups;
  }

  bullet(
    formattedGroups,
    groups,
    locale,
    hideIgnoredExportNetexBlocks,
    hideAntuValidationSteps
  ) {
    const columnStyle = (column) => ({
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minWidth: 100,
      height:
        Array.isArray(column) && column.length > 2 ? 40 * column.length : 45,
    });

    return Object.keys(formattedGroups)
      .filter((key) => key !== "BUILD_GRAPH")
      .map((group, index) => {
        let column;
        let event = formattedGroups[group];

        if (Array.isArray(event)) {
          column = Object.keys(event)
            .filter((key) => {
              if (
                hideIgnoredExportNetexBlocks &&
                NETEX_BLOCKS_EVENTS.includes(key)
              ) {
                return event[key].endState !== "IGNORED";
              }

              if (
                hideAntuValidationSteps &&
                ANTU_VALIDATION_EVENTS.includes(key)
              ) {
                return false;
              }

              if (ANTU_VALIDATION_EVENTS.includes(key)) {
                return event[key].endState !== "IGNORED";
              }

              return true;
            })
            .map((key, i) => {
              return this.renderEvent(
                event[key],
                event,
                key,
                i,
                false,
                i,
                locale
              );
            });
        } else {
          if (
            hideIgnoredExportNetexBlocks &&
            NETEX_BLOCKS_EVENTS.includes(group) &&
            event.endState === "IGNORED"
          ) {
            return null;
          }

          if (
            hideAntuValidationSteps &&
            ANTU_VALIDATION_EVENTS.includes(group)
          ) {
            return null;
          }

          if (
            ANTU_VALIDATION_EVENTS.includes(group) &&
            event.endState === "IGNORED"
          ) {
            return null;
          }

          column = this.renderEvent(
            event,
            groups,
            group,
            index,
            index === 0,
            0,
            locale
          );
        }
        return (
          <div key={"bullet-" + index} style={columnStyle(column)}>
            {column}
          </div>
        );
      });
  }

  renderEvent(event, groups, group, index, isFirst, columnIndex = 0, locale) {
    const groupStyle = {
      display: "flex",
      flexDirection: "row",
    };

    const groupText = {
      fontSize: "0.9em",
      marginLeft: 5,
    };

    const linkStyle = {
      display: "block",
      borderColor: "rgb(189, 189, 189)",
      marginLeft: -6,
      borderTopStyle: "solid",
      borderTopWidth: 1,
      width: 30,
      borderRadius: 30,
      margin: 8,
      transform: columnIndex > 0 && "translateY(-0.5em) rotate(25deg) ",
    };

    if (!ActionTranslations[locale].states[event.endState]) return null;

    let toolTipText = ActionTranslations[locale].states[event.endState];

    if (event.states && event.states[groups[group].states.length - 1]) {
      toolTipText +=
        " " +
        format(new Date(event.states[event.states.length - 1].date), "Pp", {
          locale: nb,
        });
    }

    if (event.errorOn) {
      toolTipText = ActionTranslations[locale].errorMessage[event.errorOn];
    }

    return (
      <div style={groupStyle} key={"group-" + group + index}>
        {!isFirst && <div style={linkStyle} />}
        <div
          title={toolTipText}
          style={{ opacity: event.missingBeforeStartStart ? 0.2 : 1 }}
        >
          <EventStatusIcon state={event.endState} />
        </div>
        <div
          style={{
            ...groupText,
            opacity: event.missingBeforeStartStart ? 0.2 : 1,
          }}
        >
          <ControlledLink events={event} navigate={this.props.navigate}>
            {ActionTranslations[locale].text[group]}
          </ControlledLink>
        </div>
      </div>
    );
  }

  render() {
    const stepperstyle = {
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      alignItems: "start",
      justifyContent: "center",
      marginTop: 10,
    };

    const {
      groups,
      listItem,
      locale,
      hideIgnoredExportNetexBlocks,
      hideAntuValidationSteps,
      providers,
      providerName,
    } = this.props;
    const { expanded } = this.state;

    let formattedGroups = this.addUnlistedStates(groups);
    formattedGroups = this.aggreggateFileEvents(formattedGroups);

    this.createCombinedSplit(
      formattedGroups,
      ["EXPORT_NETEX_BLOCKS", "EXPORT", "OTP2_BUILD_GRAPH"],
      "OTP2_BUILD_GRAPH"
    );

    const bullets = this.bullet(
      formattedGroups,
      groups,
      locale,
      hideIgnoredExportNetexBlocks,
      hideAntuValidationSteps
    );

    // Determine the provider name to display
    const displayProviderName =
      providerName || // Single provider view from Ninkasi
      (providers && listItem.referential && providers[listItem.referential]) || // All providers view from Ninkasi
      (listItem.provider && listItem.provider.name); // Fallback to API data

    return (
      <div
        key={"event" + listItem.chouetteJobId}
        style={{ margin: "auto", width: "98%", cursor: "pointer" }}
        onClick={() => this.handleToggleVisibility()}
      >
        <div style={{ display: "flex", marginLeft: -15 }}>
          <div
            title={translations[locale].duration + listItem.duration}
            style={{
              fontSize: "0.9em",
              fontWeight: 600,
              color: "#e59400",
              marginTop: -8,
              marginRight: 20,
            }}
          >
            {formatDistanceToNow(new Date(listItem.firstEvent), { locale: nb })}
          </div>
          {displayProviderName && (
            <div style={{ fontSize: "0.8em", fontWeight: 600, flex: 1 }}>
              {displayProviderName}
            </div>
          )}
          <div style={{ fontSize: "0.9em", fontWeight: 600, flex: 2 }}>
            {listItem.fileName || ActionTranslations[locale].filename.undefined}
          </div>
        </div>
        <div style={stepperstyle}>
          {bullets}
          <div
            style={{ marginLeft: "auto", marginRight: 20, marginTop: -25 }}
            onClick={() => this.handleToggleVisibility()}
          >
            {!expanded ? <DownArrowIcon /> : <UpArrowIcon />}
          </div>
        </div>
        {expanded && (
          <div
            style={{
              display: "flex",
              padding: 8,
              flexDirection: "column",
              marginTop: 10,
              cursor: "default",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {listItem.errorCode && (
              <div>
                <span
                  style={{ fontWeight: 600, marginRight: 10, color: "red" }}
                >
                  {ActionTranslations[locale].errorCode[listItem.errorCode]}
                </span>
              </div>
            )}
            <div>
              <span style={{ fontWeight: 600, marginRight: 10 }}>
                {translations[locale].started}
              </span>
              {format(new Date(listItem.firstEvent), "PPpp", { locale: nb })}
            </div>
            <div>
              <span style={{ fontWeight: 600, marginRight: 10 }}>
                {translations[locale].ended}
              </span>
              {format(new Date(listItem.lastEvent), "PPpp", { locale: nb })}
            </div>
            <div>
              <span style={{ fontWeight: 600, marginRight: 10 }}>
                {translations[locale].duration}
              </span>
              {formatDuration(
                duration.normalize({ milliseconds: listItem.durationMillis }),
                { locale: nb }
              )}
            </div>
            <div>
              <span style={{ fontWeight: 600, marginRight: 10 }}>
                {translations[locale].username}
              </span>
              {listItem.username}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EventStepper;
