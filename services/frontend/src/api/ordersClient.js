import { APP_CONFIG } from '../config/env.js';
import { API_CONTRACTS } from './contracts.js';
import { httpClient } from './httpClient.js';
import { mockStore } from './mocks/mockStore.js';

export const ordersClient = {
  async createOrder(payload) {
    if (APP_CONFIG.useMocks) {
      return mockStore.addOrder(payload);
    }

    return httpClient.post(API_CONTRACTS.orders.create, payload);
  },
  async getOrdersByUserId(userId) {
    if (APP_CONFIG.useMocks) {
      return mockStore.getOrdersByUserId(userId);
    }

    return httpClient.get(API_CONTRACTS.orders.getByUserId(userId));
  },
};
