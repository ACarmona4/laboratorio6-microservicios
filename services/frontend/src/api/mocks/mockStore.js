import {
  fallbackBooks,
  fallbackOrders,
  fallbackReviews,
  fallbackUser,
} from './mockData.js';

const STORAGE_KEYS = {
  reviews: 'bookstore_mock_reviews',
  orders: 'bookstore_mock_orders',
  user: 'bookstore_mock_user',
};

const safeRead = (key, fallbackValue) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch (_) {
    return fallbackValue;
  }
};

const safeWrite = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {
    return null;
  }
  return value;
};

const state = {
  reviews: safeRead(STORAGE_KEYS.reviews, fallbackReviews),
  orders: safeRead(STORAGE_KEYS.orders, fallbackOrders),
  user: safeRead(STORAGE_KEYS.user, fallbackUser),
};

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return String(Date.now());
};

export const mockStore = {
  getBooks() {
    return [...fallbackBooks];
  },
  getBookById(bookId) {
    return fallbackBooks.find((book) => book.id === bookId) || null;
  },
  getReviewsByBookId(bookId) {
    return state.reviews.filter((review) => review.bookId === bookId);
  },
  addReview({ bookId, userId, rating, comment }) {
    const createdReview = {
      id: createId(),
      bookId,
      userId,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString(),
    };

    state.reviews = [createdReview, ...state.reviews];
    safeWrite(STORAGE_KEYS.reviews, state.reviews);
    return createdReview;
  },
  getOrdersByUserId(userId) {
    return state.orders.filter((order) => order.userId === userId);
  },
  addOrder({ userId, bookId, quantity }) {
    const book = this.getBookById(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    const parsedQuantity = Number(quantity);
    const unitPrice = Number(book.price);
    const total = parsedQuantity * unitPrice;

    const order = {
      id: createId(),
      userId,
      bookId,
      bookName: book.name,
      quantity: parsedQuantity,
      unitPrice,
      total,
      status: 'CONFIRMED',
      paymentMethod: 'CASH',
      createdAt: new Date().toISOString(),
    };

    state.orders = [order, ...state.orders];
    safeWrite(STORAGE_KEYS.orders, state.orders);
    return {
      message: 'Order confirmed. Payment will be made on delivery.',
      order,
    };
  },
  getCurrentUser() {
    return state.user;
  },
  updateCurrentUser(nextUser) {
    state.user = {
      ...state.user,
      ...nextUser,
    };
    safeWrite(STORAGE_KEYS.user, state.user);
    return state.user;
  },
};
