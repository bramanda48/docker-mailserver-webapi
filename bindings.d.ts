type Environment = {
  Bindings: EnvironmentBindings;
};

type EnvironmentBindings = {
  remoteAddr: () => string;

  // Define all environment variables
  DENO_ENV: string;
  WEB_API_KEY: string;
  WEB_API_WHITELISTED_IP: string;
  WEB_API_DMS_CONFIG_PATH: string;
  WEB_API_FAIL2BAN_SQLITE_PATH: string;
};
