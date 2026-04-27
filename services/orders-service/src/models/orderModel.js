import crypto from "crypto";
import pool from "../config/db.js";

const mapRowToOrder = (row) => ({
  id: row.id,
  userId: row.user_id,
  bookId: row.book_id,
  bookName: row.book_name,
  quantity: row.quantity,
  unitPrice: parseFloat(row.unit_price),
  total: parseFloat(row.total),
  status: row.status,
  paymentMethod: row.payment_method,
  createdAt: row.created_at,
});

export const saveOrder = async ({
  userId,
  bookId,
  bookName,
  quantity,
  unitPrice,
  total,
}) => {
  const id = crypto.randomUUID();
  const status = "CONFIRMED";
  const paymentMethod = "CASH";

  const result = await pool.query(
    `INSERT INTO orders 
      (id, user_id, book_id, book_name, quantity, unit_price, total, status, payment_method) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
     RETURNING *`,
    [id, userId, bookId, bookName, quantity, unitPrice, total, status, paymentMethod]
  );

  return mapRowToOrder(result.rows[0]);
};

export const findOrderById = async (id) => {
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  if (result.rows.length === 0) return null;
  return mapRowToOrder(result.rows[0]);
};

export const findOrdersByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
  return result.rows.map(mapRowToOrder);
};