import React from "react";
import { Pagination } from "@entur/menu";
import { Switch } from "@entur/form";
import EventStepper from "./EventStepper";
import translations from "./translations";
import FilterButtonTray from "./FilterButtonTray";
import buttonConfig, { getLastValidDate } from "./buttonConfig";
import "./EventDetails.css";
import { Label } from "@entur/typography";

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePageIndex: 1,
      endStateFilter: "ALL",
      dateFilter: "LAST_WEEK",
      onlyNewDeliveryFilter: false,
    };
  }

  handlePageClick(pageIndex) {
    this.setState({
      activePageIndex: pageIndex,
    });
  }

  handleFilterChange(dateFilter) {
    this.setState({
      dateFilter: dateFilter,
      activePageIndex: 1,
    });
  }

  getFilteredSource(
    dataSource,
    dateFilter,
    endStateFilter,
    onlyNewDeliveryFilter
  ) {
    const lastDate = getLastValidDate(dateFilter);

    return (dataSource || []).filter((event) => {
      const appliedFilter = [];

      /* Filter by date from pre-defined periods */
      if (lastDate) {
        const filterByPeriod = new Date(event.firstEvent) > lastDate;
        appliedFilter.push(filterByPeriod);
      }

      /* Filter by end state from dropdown */
      const endStateFilterApplied =
        endStateFilter === "FAILED" ||
        endStateFilter === "OK" ||
        endStateFilter === "CANCELLED";

      if (endStateFilterApplied) {
        const filterByEndState = event.endState === endStateFilter;
        appliedFilter.push(filterByEndState);
      }

      /* Filter by only new deliveries */
      const containsEvents = Array.isArray(event.events) && event.events.length;

      if (containsEvents && onlyNewDeliveryFilter) {
        const filterByNewDelivery = event.events[0].action === "FILE_TRANSFER";
        appliedFilter.push(filterByNewDelivery);
      }

      return appliedFilter.every((filter) => filter);
    });
  }

  render() {
    const {
      dataSource,
      locale,
      hideIgnoredExportNetexBlocks = true,
      hideAntuValidationSteps = true,
      navigate,
      providers,
      providerName,
    } = this.props;

    const {
      activePageIndex,
      endStateFilter,
      dateFilter,
      onlyNewDeliveryFilter,
    } = this.state;

    const filteredSource = this.getFilteredSource(
      dataSource,
      dateFilter,
      endStateFilter,
      onlyNewDeliveryFilter
    );
    const paginationMap = getPaginationMap(filteredSource);

    const filters = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <FilterButtonTray
          label="Status"
          locale={locale}
          activeButtonId={endStateFilter}
          onChange={(selectedItem) => {
            this.setState({
              endStateFilter: selectedItem,
              activePageIndex: 1,
            });
          }}
          buttonConfig={{
            fields: [
              {
                id: "ALL",
              },
              {
                id: "OK",
              },
              {
                id: "CANCELLED",
              },
              {
                id: "FAILED",
              },
            ],
          }}
          translationKey="states"
        />

        <FilterButtonTray
          label="Uploaded"
          locale={locale}
          activeButtonId={this.state.dateFilter}
          onChange={this.handleFilterChange.bind(this)}
          buttonConfig={buttonConfig}
          translationKey="filterButton"
        />

        <div style={{ marginLeft: "1rem" }}>
          <Label>{translations[locale].filter_direct_delivery}</Label>
          <Switch
            checked={onlyNewDeliveryFilter}
            onChange={(e) => {
              this.setState({
                onlyNewDeliveryFilter: e.target.checked,
                activePageIndex: 1,
              });
            }}
          />
        </div>
      </div>
    );

    const page = paginationMap[activePageIndex - 1];

    if (page && page.length && paginationMap) {
      return (
        <div>
          <div style={{ width: "100%", marginBottom: "2rem" }}>{filters}</div>
          <div className="page-link-parent">
            <Pagination
              pageCount={Math.ceil(filteredSource.length / 10)}
              numberOfResults={filteredSource.length}
              currentPage={activePageIndex}
              resultsPerPage={10}
              onPageChange={this.handlePageClick.bind(this)}
            />
          </div>
          <div>
            {page.map((listItem, index) => {
              let eventGroup = {};

              listItem.events.forEach((event) => {
                if (!eventGroup[event.action]) {
                  eventGroup[event.action] = {};
                  eventGroup[event.action].states = [];
                }
                eventGroup[event.action].states.push(event);
                eventGroup[event.action].endState = event.state;
              });

              return (
                <div
                  key={"jobstatus-" + listItem.chouetteJobId + "-" + index}
                  style={{
                    marginBottom: 20,
                    border: "1px solid #eee",
                    padding: 10,
                    overflowY: "scroll",
                    height: "100%",
                  }}
                >
                  <EventStepper
                    locale={locale}
                    key={"event-group-" + listItem.chouetteJobId + "-" + index}
                    groups={eventGroup}
                    listItem={listItem}
                    hideIgnoredExportNetexBlocks={hideIgnoredExportNetexBlocks}
                    hideAntuValidationSteps={hideAntuValidationSteps}
                    navigate={navigate}
                    providers={providers}
                    providerName={providerName}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%", textAlign: "left", marginBottom: 5 }}>
          {filters}
          <div
            style={{
              marginBottom: 20,
              marginTop: 20,
              border: "1px solid #eee",
              padding: 40,
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {translations[locale].no_status}
            </div>
          </div>
        </div>
      );
    }
  }
}

const getPaginationMap = (statusList = []) => {
  let paginationMap = [];

  if (statusList && statusList.length) {
    for (let i = 0, j = statusList.length; i < j; i += 10) {
      paginationMap.push(statusList.slice(i, i + 10));
    }
  }
  return paginationMap;
};

export default EventDetails;
