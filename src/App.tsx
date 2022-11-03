import React from "react";
import { DefaultPayload } from "@entur/micro-frontend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigContext, useConfigProviderValue } from "./config/config";
import { ConnectedEventDetails } from "./components/ConnectedEventDetails";
import "./App.css";
import { UploadAndValidation } from "./components/UploadAndValidation";

const queryClient = new QueryClient();

export interface AppProps extends DefaultPayload {
  hideIgnoredExportNetexBlocks?: boolean;
  hideAntuValidationSteps?: boolean;
  navigate?: (url: string) => void;
}

export const AppContext = React.createContext<AppProps>({
  hideIgnoredExportNetexBlocks: true,
  hideAntuValidationSteps: false,
  navigate: () => {},
});

export function App(props: AppProps) {
  const { config, loading } = useConfigProviderValue(props.env!);

  return (
    <React.StrictMode>
      {!loading && (
        <ConfigContext.Provider value={config}>
          <AppContext.Provider value={props}>
            <QueryClientProvider client={queryClient}>
              <div className="zagmuk-app">
                <div className="zagmuk-app-content card">
                  <div style={{ marginLeft: "1rem" }}>
                    <UploadAndValidation />
                  </div>
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
