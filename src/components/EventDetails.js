import React from 'react';
import EventStepper from './EventStepper';
import './EventDetails.css';
//import FaFresh from 'react-icons/lib/fa/refresh';
import translations from './translations';
import FilterButtonTray from './FilterButtonTray';
import { getLastValidDate } from './buttonConfig';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePageIndex: 0,
      endStateFilter: 'ALL',
      dateFilter: props.showDateFilter ? 'LAST_12_HOURS' : 'ALL_TIME',
      onlyNewDeliveryFilter: false
    };
  }

  handlePageClick(e, pageIndex) {
    e.preventDefault();
    this.setState({
      activePageIndex: pageIndex
    });
  }

  handleFilterChange(dateFilter) {
    this.setState({
      dateFilter: dateFilter,
      activePageIndex: 0
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
        <select
          style={{ fontSize: '0.9em' }}
          value={endStateFilter}
          onChange={e => {
            e.preventDefault();
            this.setState({
              endStateFilter: e.target.value,
              activePageIndex: 0
            });
          }}
        >
          <option value="ALL">{translations[locale].show_all}</option>
          <option value="OK">{translations[locale].show_only_success}</option>
          <option value="CANCELLED">
            {translations[locale].show_only_cancelled}
          </option>
          <option value="FAILED">
            {translations[locale].show_only_failed}
          </option>
        </select>
        {showDateFilter && (
          <FilterButtonTray
            locale={locale}
            style={{ marginLeft: 20 }}
            activeButtonId={this.state.dateFilter}
            onChange={this.handleFilterChange.bind(this)}
          />
        )}
        {showNewDeliveriesFilter && (
          <div style={{ marginLeft: 10, paddingTop: 2 }}>
            <input
              type="checkbox"
              id="direct_delivery"
              name="direct_delivery"
              checked={onlyNewDeliveryFilter}
              style={{ margin: '0 10px' }}
              onChange={e => {
                this.setState({
                  onlyNewDeliveryFilter: e.target.checked,
                  activePageIndex: 0
                });
              }}
            />
            <label htmlFor="direct_delivery">
              {translations[locale].filter_direct_delivery}
            </label>
          </div>
        )}
      </div>
    );

    const page = paginationMap[activePageIndex];

    const refreshButton = this.props.handleRefresh && (
      <div style={{ marginRight: 15, float: 'right', cursor: 'pointer' }}>
        {/* <FaFresh
          style={{ transform: 'scale(1.5)' }}
          onClick={this.props.handleRefresh}
        /> */}
      </div>
    );

    if (page && page.length && paginationMap) {
      return (
        <div>
          <div style={{ width: '100%', textAlign: 'left', marginBottom: 5 }}>
            {filters}
          </div>
          {refreshButton}
          <div className="page-link-parent">
            <span>{translations[locale].page}</span>
            {paginationMap.map((page, index) => {
              const isActive =
                index == activePageIndex
                  ? 'page-link active-link'
                  : 'page-link inactive-link';
              return (
                <span
                  className={isActive}
                  onClick={e => this.handlePageClick(e, index)}
                  key={'link-' + index}
                >
                  {index + 1}
                </span>
              );
            })}
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
