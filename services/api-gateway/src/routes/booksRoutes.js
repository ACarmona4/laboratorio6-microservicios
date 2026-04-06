import express from 'express';
import {
  getBooks,
  getBookById,
  getReviewsForBook,
  createReviewForBook,
} from '../controllers/booksController.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.get('/:id/reviews', getReviewsForBook);
router.post('/:id/reviews', createReviewForBook);

export default router;
