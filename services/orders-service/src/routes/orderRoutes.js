import express from 'express';
import {
  createOrder,
  getOrdersByUserId,
  getOrderById,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUserId);
router.get('/:id', getOrderById);

export default router;