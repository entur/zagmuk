import React from 'react';
// import { AppProvider } from './AppProvider';
import { DefaultPayload } from '@entur/micro-frontend';
import { ConfigContext, useConfigProviderValue } from './config/config';
//import { IntlProvider } from 'react-intl';
//import { useLocaleData } from './hooks/useLocaleData';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import EventDetails from './components/EventDetails';
import './App.css';


import testData from './testData.json';
import { ConnectedEventDetails } from './components/ConnectedEventDetails';

interface AppProps extends DefaultPayload {}

export function App(props: AppProps) {
  const { config, loading } = useConfigProviderValue(props.env!);
  // const localeData = useLocaleData(props.locale!);

  Sentry.init({
    dsn: config.sentryDSN,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    environment: config.env,
    release: `zagmuk@${process.env.REACT_APP_VERSION}`,
  });

  return (
    <React.StrictMode>
      {!loading && (
        <ConfigContext.Provider value={config}>
          {/* <IntlProvider
            messages={localeData}
            locale={props.locale!}
            defaultLocale="en"
          > */}
                <div className="zagmuk-app">
                  <div className="zagmuk-app-content">
                    <ConnectedEventDetails providerId={props.providerId}>
                      {(eventDetails: any) => (
                        <EventDetails
                          handleRefresh={() => {}} // todo: implement
                          navigate={() => {}} // todo: implement
                          locale="en"
                          dataSource={eventDetails}
                          showDateFilter
                          showNewDeliveriesFilter
                          hideIgnoredExportNetexBlocks={false}
                          hideAntuValidationSteps={false}
                        />
                      )}
                      </ConnectedEventDetails>
                  </div>
                </div>
          {/* </IntlProvider> */}
        </ConfigContext.Provider>
      )}
    </React.StrictMode>
  );
}