import React, { useEffect } from "react";
import {
  Auth0Provider,
  Auth0ProviderOptions,
  useAuth0,
} from "@auth0/auth0-react";
import { App } from "./App";
import { Dropdown } from "@entur/dropdown";

const onRedirectCallback =
  (navigate: any) =>
  (appState: any): void => {
    navigate(appState?.returnTo || window.location.pathname);
  };

export interface Props extends Auth0ProviderOptions {}

const AuthedApp = () => {
  const auth = useAuth0();
  const [providers, setProviders] = React.useState<any[]>([]);
  const [providerId, setProviderId] = React.useState<string | undefined>();

  useEffect(() => {
    const fetchProviders = async () => {
      const accessToken = await auth.getAccessTokenSilently();
      const response = await fetch(
        "https://api.dev.entur.io/timetable-admin/v1/providers",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();
      setProviders(data);
    };

    fetchProviders();
  }, [auth]);

  return (
    <>
      <Dropdown
        label="Provider"
        items={() => providers.map((p) => ({ value: p.id, label: p.name }))}
        onChange={(p: any) => setProviderId(p.value)}
        value={providerId}
      />
      <App
        locale={process.env.REACT_APP_LOCALE || "en"}
        env={process.env.REACT_APP_ENV || "dev"}
        getToken={auth.getAccessTokenSilently}
        providerId={providerId}
        hideAntuValidationSteps={false}
        hideIgnoredExportNetexBlocks={false}
        navigate={(url) => window.location.href = url}
      />
    </>
  );
};

export const AppShellStandalone = (props: Props) => {
  return (
    <Auth0Provider
      {...props}
      cacheLocation="localstorage"
      useRefreshTokens
      onRedirectCallback={onRedirectCallback((v: string) =>
        window.history.pushState(null, v)
      )}
    >
      <AuthedApp />
    </Auth0Provider>
  );
};
