import express from 'express';
import { getReviewsByBookId, createReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/book/:bookId', getReviewsByBookId);
router.post('/', createReview);

export default router;