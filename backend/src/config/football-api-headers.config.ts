export const FOOTBALL_API_HEADERS_CONFIG_NAME = 'footballApiHeaders';

export interface FootballApiHeadersConfig {
  'x-rapidapi-key': string;
  'x-rapidapi-host': string;
}

export default (): {
  [FOOTBALL_API_HEADERS_CONFIG_NAME]: FootballApiHeadersConfig;
} => {
  const rapidApiKey = process.env.RAPIDAPI_KEY || 'xxx';
  const rapidApiHost = process.env.RAPIDAPI_HOST || 'xxx';

  return {
    [FOOTBALL_API_HEADERS_CONFIG_NAME]: {
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': rapidApiHost,
    },
  };
};
