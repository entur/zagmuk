import React from 'react';
import { RefreshIcon } from '@entur/icons'
import { FloatingButton } from '@entur/button';
import { Pagination } from '@entur/menu';
import { Dropdown } from '@entur/dropdown';
import { Checkbox } from '@entur/form';
import EventStepper from './EventStepper';
import translations from './translations';
import FilterButtonTray from './FilterButtonTray';
import { getLastValidDate } from './buttonConfig';
import './EventDetails.css';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePageIndex: 1,
      endStateFilter: 'ALL',
      dateFilter: props.showDateFilter ? 'LAST_12_HOURS' : 'ALL_TIME',
      onlyNewDeliveryFilter: false
    };
  }

  handlePageClick(pageIndex) {
    this.setState({
      activePageIndex: pageIndex
    });
  }

  handleFilterChange(dateFilter) {
    this.setState({
      dateFilter: dateFilter,
      activePageIndex: 1
    });
  }

  getFilteredSource(
    dataSource,
    dateFilter,
    endStateFilter,
    onlyNewDeliveryFilter
  ) {
    
    const lastDate = getLastValidDate(dateFilter);

    return (dataSource || []).filter(event => {
      const appliedFilter = [];

      /* Filter by date from pre-defined periods */
      if (lastDate) {
        const filterByPeriod = new Date(event.firstEvent) > lastDate;
        appliedFilter.push(filterByPeriod);
      }

      /* Filter by end state from dropdown */
      const endStateFilterApplied =
        endStateFilter === 'FAILED' ||
        endStateFilter === 'OK' ||
        endStateFilter === 'CANCELLED';

      if (endStateFilterApplied) {
        const filterByEndState = event.endState === endStateFilter;
        appliedFilter.push(filterByEndState);
      }

      /* Filter by only new deliveries */
      const containsEvents = Array.isArray(event.events) && event.events.length;

      if (containsEvents && onlyNewDeliveryFilter) {
        const filterByNewDelivery = event.events[0].action === 'FILE_TRANSFER';
        appliedFilter.push(filterByNewDelivery);
      }

      return appliedFilter.every(filter => filter);
    });
  }

  render() {
    const {
      dataSource,
      locale,
      includeLevel2,
      showDateFilter,
      showNewDeliveriesFilter,
      hideIgnoredExportNetexBlocks = true,
      hideAntuValidationSteps = true,
      navigate
    } = this.props;

    const {
      activePageIndex,
      endStateFilter,
      dateFilter,
      onlyNewDeliveryFilter
    } = this.state;

    const filteredSource = this.getFilteredSource(
      dataSource,
      dateFilter,
      endStateFilter,
      onlyNewDeliveryFilter
    );
    const paginationMap = getPaginationMap(filteredSource);

    const filters = (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ minWidth: '12.5rem'}}>
          <Dropdown
            label={translations[locale].show}
            value={endStateFilter}
            onChange={selectedItem => this.setState({ endStateFilter: selectedItem.value, activePageIndex: 1 })}
            items={[
              { label: translations[locale].show_all, value: 'ALL' },
              { label: translations[locale].show_only_success, value: 'OK' },
              { label: translations[locale].show_only_cancelled, value: 'CANCELLED' },
              { label: translations[locale].show_only_failed, value: 'FAILED' },
            ]}
          />
        </div>
        
        {showDateFilter && (
          <div>
            <FilterButtonTray
              locale={locale}
              style={{ marginLeft: 20 }}
              activeButtonId={this.state.dateFilter}
              onChange={this.handleFilterChange.bind(this)}
            />
          </div>
        )}

        {showNewDeliveriesFilter && (
          <div style={{ marginLeft: 10 }}>
            <Checkbox
              checked={onlyNewDeliveryFilter}
              onChange={e => {
                this.setState({
                  onlyNewDeliveryFilter: e.target.checked,
                  activePageIndex: 1
                });
              }}
            >
              {translations[locale].filter_direct_delivery}
            </Checkbox>
          </div>
        )}
      </div>
    );

    const page = paginationMap[activePageIndex - 1];

    const refreshButton = this.props.handleRefresh && (
        <FloatingButton size="small" onClick={this.props.handleRefresh}>
          <RefreshIcon />
          {translations[locale].refresh}
        </FloatingButton>
    );

    if (page && page.length && paginationMap) {
      return (
        <div>
          <div style={{ width: '100%', textAlign: 'left', marginBottom: 5 }}>
            {filters}
          </div>
          <div style={{ marginRight: 15, float: 'right' }}>
            {refreshButton}
          </div>
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

              listItem.events.forEach(event => {
                if (!eventGroup[event.action]) {
                  eventGroup[event.action] = {};
                  eventGroup[event.action].states = [];
                }
                eventGroup[event.action].states.push(event);
                eventGroup[event.action].endState = event.state;
              });

              return (
                <div
                  key={'jobstatus-' + listItem.chouetteJobId + '-' + index}
                  style={{
                    marginBottom: 20,
                    border: '1px solid #eee',
                    padding: 10
                  }}
                >
                  <EventStepper
                    includeLevel2={includeLevel2}
                    locale={locale}
                    key={'event-group-' + listItem.chouetteJobId + '-' + index}
                    groups={eventGroup}
                    listItem={listItem}
                    hideIgnoredExportNetexBlocks={hideIgnoredExportNetexBlocks}
                    hideAntuValidationSteps={hideAntuValidationSteps}
                    navigate={navigate}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ width: '100%', textAlign: 'left', marginBottom: 5 }}>
          {filters}
          <div
            style={{
              marginBottom: 20,
              marginTop: 20,
              border: '1px solid #eee',
              padding: 40
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {translations[locale].no_status}
            </div>
            <div style={{ marginLeft: 10 }}>{refreshButton}</div>
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
