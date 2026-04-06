import { APP_CONFIG } from '../config/env.js';
import { API_CONTRACTS } from './contracts.js';
import { httpClient } from './httpClient.js';
import { mockStore } from './mocks/mockStore.js';

const useMockUsers = APP_CONFIG.usersMode !== 'api';
const CURRENT_USER_ID_KEY = 'bookstore_current_user_id';

const readCurrentUserId = () => {
  try {
    return window.localStorage.getItem(CURRENT_USER_ID_KEY);
  } catch (_) {
    return null;
  }
};

const writeCurrentUserId = (id) => {
  try {
    window.localStorage.setItem(CURRENT_USER_ID_KEY, id);
  } catch (_) {
    return null;
  }
  return id;
};

const buildBootstrapUserPayload = () => {
  const suffix = Date.now().toString(36);
  return {
    name: 'Usuario Bookstore',
    email: `user.${suffix}@bookstore.local`,
  };
};

const createAndStoreUser = async () => {
  const created = await httpClient.post(API_CONTRACTS.users.create, buildBootstrapUserPayload());
  if (created?.id) {
    writeCurrentUserId(created.id);
  }
  return created;
};

export const usersClient = {
  async getCurrentUser() {
    if (useMockUsers) {
      return mockStore.getCurrentUser();
    }

    const storedId = readCurrentUserId();

    if (!storedId) {
      return createAndStoreUser();
    }

    try {
      return await httpClient.get(API_CONTRACTS.users.getById(storedId));
    } catch (error) {
      if (error.status === 404) {
        return createAndStoreUser();
      }

      throw error;
    }
  },
  async updateCurrentUser(userId, payload) {
    if (useMockUsers) {
      return mockStore.updateCurrentUser(payload);
    }

    let targetUserId = userId || readCurrentUserId();

    if (!targetUserId) {
      const created = await createAndStoreUser();
      targetUserId = created.id;
    }

    const updated = await httpClient.put(API_CONTRACTS.users.updateById(targetUserId), payload);
    writeCurrentUserId(updated?.id || targetUserId);
    return updated;
  },
};
