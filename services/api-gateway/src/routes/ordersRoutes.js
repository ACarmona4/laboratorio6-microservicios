import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
} from '../controllers/ordersController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUserId);
router.get('/:id', getOrderById);

export default router;
