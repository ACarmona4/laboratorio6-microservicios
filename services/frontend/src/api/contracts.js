export const API_CONTRACTS = {
  health: '/health',
  books: {
    getAll: '/books',
    getById: (bookId) => `/books/${bookId}`,
  },
  reviews: {
    getByBookId: (bookId) => `/reviews/book/${bookId}`,
    create: '/reviews',
  },
  orders: {
    create: '/orders',
    getByUserId: (userId) => `/orders/user/${userId}`,
    getById: (orderId) => `/orders/${orderId}`,
  },
  users: {
    create: '/users',
    getById: (userId) => `/users/${userId}`,
    updateById: (userId) => `/users/${userId}`,
  },
};
