import { servicesConfig } from '../config/services.js';
import { proxyRequest } from '../utils/proxy.js';

const usersNotReady = (res) =>
  res.status(501).json({
    message: 'users-service not available yet',
    note: 'Set USERS_SERVICE_ENABLED=true when users-service is ready',
  });

const endpointNotAvailable = (res, route) =>
  res.status(501).json({
    message: `${route} is not implemented in users-service`,
  });

export const createUser = async (req, res) => {
  if (!servicesConfig.usersEnabled) {
    return usersNotReady(res);
  }

  return proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.users,
    path: '/users',
    method: 'POST',
    body: req.body,
  });
};

export const getUsers = async (req, res) => {
  if (!servicesConfig.usersEnabled) {
    return usersNotReady(res);
  }

  return endpointNotAvailable(res, 'GET /users');
};

export const getCurrentUser = async (req, res) => {
  if (!servicesConfig.usersEnabled) {
    return usersNotReady(res);
  }

  return endpointNotAvailable(res, 'GET /users/me');
};

export const getUserById = async (req, res) => {
  if (!servicesConfig.usersEnabled) {
    return usersNotReady(res);
  }

  return proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.users,
    path: `/users/${req.params.id}`,
    method: 'GET',
  });
};

export const updateUserById = async (req, res) => {
  if (!servicesConfig.usersEnabled) {
    return usersNotReady(res);
  }

  return proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.users,
    path: `/users/${req.params.id}`,
    method: 'PUT',
    body: req.body,
  });
};
