import express from 'express';
import {
  createUser,
  getCurrentUser,
  getUserById,
  getUsers,
  updateUserById,
} from '../controllers/usersController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);

export default router;
