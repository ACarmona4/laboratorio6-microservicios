import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { findUserById, saveUser, updateUserById } from '../models/userModel.js';

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'name and email are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'email must be valid',
      });
    }

    const newUser = await saveUser({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by id:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (name === undefined && email === undefined) {
      return res.status(400).json({
        message: 'At least one field (name or email) is required',
      });
    }

    if (email !== undefined && !isValidEmail(email)) {
      return res.status(400).json({
        message: 'email must be valid',
      });
    }

    const updatedUser = await updateUserById(id, {
      ...(name !== undefined ? { name: String(name).trim() } : {}),
      ...(email !== undefined ? { email: String(email).trim().toLowerCase() } : {}),
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof ConditionalCheckFailedException || error.name === 'ConditionalCheckFailedException') {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    console.error('Error updating user:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
