const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

export const servicesConfig = {
  books: trimTrailingSlash(process.env.BOOKS_SERVICE_URL || 'http://localhost:5001'),
  reviews: trimTrailingSlash(process.env.REVIEWS_SERVICE_URL || 'http://localhost:5002'),
  orders: trimTrailingSlash(process.env.ORDERS_SERVICE_URL || 'http://localhost:5003'),
  users: trimTrailingSlash(process.env.USERS_SERVICE_URL || 'http://localhost:5004'),
  usersEnabled: process.env.USERS_SERVICE_ENABLED !== 'false',
  timeoutMs: Number(process.env.SERVICE_TIMEOUT_MS || 7000),
};
