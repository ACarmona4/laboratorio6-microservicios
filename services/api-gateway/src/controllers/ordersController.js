import { servicesConfig } from '../config/services.js';
import { proxyRequest } from '../utils/proxy.js';

export const createOrder = async (req, res) =>
  proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.orders,
    path: '/orders',
    method: 'POST',
    body: req.body,
  });

export const getOrdersByUserId = async (req, res) =>
  proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.orders,
    path: `/orders/user/${req.params.userId}`,
    method: 'GET',
  });

export const getOrderById = async (req, res) =>
  proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.orders,
    path: `/orders/${req.params.id}`,
    method: 'GET',
  });
