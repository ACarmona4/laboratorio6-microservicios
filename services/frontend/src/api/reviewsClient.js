import { APP_CONFIG } from '../config/env.js';
import { API_CONTRACTS } from './contracts.js';
import { httpClient } from './httpClient.js';
import { mockStore } from './mocks/mockStore.js';

export const reviewsClient = {
  async getReviewsByBookId(bookId) {
    if (APP_CONFIG.useMocks) {
      return mockStore.getReviewsByBookId(bookId);
    }

    return httpClient.get(API_CONTRACTS.reviews.getByBookId(bookId));
  },
  async createReview(payload) {
    if (APP_CONFIG.useMocks) {
      return mockStore.addReview(payload);
    }

    return httpClient.post(API_CONTRACTS.reviews.create, payload);
  },
};
