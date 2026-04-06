import { servicesConfig } from '../config/services.js';
import { proxyRequest } from '../utils/proxy.js';

export const getBooks = async (req, res) =>
  proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.books,
    path: '/books',
    method: 'GET',
  });

export const getBookById = async (req, res) =>
  proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.books,
    path: `/books/${req.params.id}`,
    method: 'GET',
  });

export const getReviewsForBook = async (req, res) =>
  proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.reviews,
    path: `/reviews/book/${req.params.id}`,
    method: 'GET',
  });

export const createReviewForBook = async (req, res) =>
  proxyRequest(req, res, {
    serviceBaseUrl: servicesConfig.reviews,
    path: '/reviews',
    method: 'POST',
    body: {
      ...req.body,
      bookId: req.params.id,
    },
  });
