import React from "react";
import { DefaultPayload } from "@entur/micro-frontend";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ConfigContext, useConfigProviderValue } from "./config/config";
import { ConnectedEventDetails } from "./components/ConnectedEventDetails";

import "./App.css";
import { UploadAndValidation } from "./components/UploadAndValidation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export interface AppProps extends DefaultPayload {}

export const AppContext = React.createContext<AppProps>({});

export function App(props: AppProps) {
  const { config, loading } = useConfigProviderValue(props.env!);

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
          <AppContext.Provider value={props}>
            <QueryClientProvider client={queryClient}>
              <div className="zagmuk-app">
                <div className="zagmuk-app-content">
                  <UploadAndValidation />
                  <ConnectedEventDetails />
                </div>
              </div>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </AppContext.Provider>
        </ConfigContext.Provider>
      )}
    </React.StrictMode>
  );
}
