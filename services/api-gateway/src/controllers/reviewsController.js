import { servicesConfig } from '../config/services.js';
import { proxyRequest } from '../utils/proxy.js';

export const getReviewsByBookId = async (req, res) =>
  proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.reviews,
    path: `/reviews/book/${req.params.bookId}`,
    method: 'GET',
  });

export const createReview = async (req, res) =>
  proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.reviews,
    path: '/reviews',
    method: 'POST',
    body: req.body,
  });
