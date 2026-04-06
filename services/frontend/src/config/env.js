const stripTrailingSlash = (value) => value.replace(/\/+$/, '');

const apiGatewayUrl = stripTrailingSlash(
  import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080/api'
);

export const APP_CONFIG = {
  appName: import.meta.env.VITE_APP_NAME || 'Bookstore Frontend',
  apiGatewayUrl,
  useMocks: (import.meta.env.VITE_USE_MOCKS || 'true') === 'true',
  usersMode: import.meta.env.VITE_USERS_MODE || 'mock',
};
