import express from 'express';
import { createReview, getReviewsByBookId } from '../controllers/reviewsController.js';

const router = express.Router();

router.get('/book/:bookId', getReviewsByBookId);
router.post('/', createReview);

export default router;
