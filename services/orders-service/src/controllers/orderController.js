import {
  saveOrder,
  findOrderById,
  findOrdersByUserId,
} from '../models/orderModel.js';
import { getBookById } from '../grpc/clients/bookGrpcClient.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, bookId, quantity } = req.body;

    if (!userId || !bookId || quantity === undefined) {
      return res.status(400).json({
        message: 'userId, bookId and quantity are required',
      });
    }

    const numericQuantity = Number(quantity);

    if (!Number.isInteger(numericQuantity) || numericQuantity < 1) {
      return res.status(400).json({
        message: 'quantity must be an integer greater than 0',
      });
    }

    const book = await getBookById(bookId);

    if (!book.exists) {
      return res.status(404).json({
        message: 'Book not found',
      });
    }

    if (book.countInStock < numericQuantity) {
      return res.status(400).json({
        message: 'Insufficient stock',
      });
    }

    const unitPrice = Number(book.price);
    const total = unitPrice * numericQuantity;

    const newOrder = await saveOrder({
      userId,
      bookId,
      bookName: book.name,
      quantity: numericQuantity,
      unitPrice,
      total,
    });

    res.status(201).json({
      message: 'Order confirmed. Payment will be made on delivery.',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await findOrdersByUserId(userId);

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting orders by user id:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await findOrderById(id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error getting order by id:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};