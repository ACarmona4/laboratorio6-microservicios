import { APP_CONFIG } from '../config/env.js';
import { API_CONTRACTS } from './contracts.js';
import { httpClient } from './httpClient.js';
import { mockStore } from './mocks/mockStore.js';

export const booksClient = {
  async getBooks() {
    if (APP_CONFIG.useMocks) {
      return mockStore.getBooks();
    }

    return httpClient.get(API_CONTRACTS.books.getAll);
  },
  async getBookById(bookId) {
    if (APP_CONFIG.useMocks) {
      const book = mockStore.getBookById(bookId);
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    }

    return httpClient.get(API_CONTRACTS.books.getById(bookId));
  },
};
