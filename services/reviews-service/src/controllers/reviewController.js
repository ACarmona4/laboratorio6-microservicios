import { findReviewsByBookId, saveReview } from '../models/reviewModel.js';
import { getBookById } from '../grpc/clients/bookGrpcClient.js';

export const getReviewsByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await findReviewsByBookId(bookId);

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error getting reviews by book id:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { bookId, userId, rating, comment } = req.body;

    if (!bookId || !userId || rating === undefined || !comment) {
      return res.status(400).json({
        message: 'bookId, userId, rating and comment are required',
      });
    }

    const numericRating = Number(rating);

    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        message: 'rating must be a number between 1 and 5',
      });
    }

    const book = await getBookById(bookId);

    if (!book.exists) {
      return res.status(404).json({
        message: 'Book not found',
      });
    }

    const newReview = await saveReview({
      bookId,
      userId,
      rating: numericRating,
      comment,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};