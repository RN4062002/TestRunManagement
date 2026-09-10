export const ENV = {
  IS_DEV: import.meta.env.DEV,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.taskhub.local/v1',
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API !== 'false',
};
