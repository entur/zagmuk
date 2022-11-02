import { createContext, useContext, useEffect, useState } from "react";
const globalConfig = require("./global.json");

export interface Config {
  sentryDSN?: string;
  env?: string;
  udugBaseUrl?: string;
  chouetteBaseUrl?: string;
  timetableEventsApiUrl?: string;
  timetableAdminApiUrl?: string;
}

export const ConfigContext = createContext<Config>(globalConfig);

const getConfig = async (env: string="dev"): Promise<Config> => {
  const { default: config } = await import(`./environments/${env}.json`);
  return Object.assign({}, globalConfig, config);
};

export const useConfig = () => {
  return useContext(ConfigContext);
};

export const useConfigProviderValue = (env: string) => {
  const [config, setConfig] = useState<Config>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      setConfig(await getConfig(env));
      setLoading(false);
    };
    fetchConfig();
  }, [env]);

  return {
    config,
    loading,
  };
};
