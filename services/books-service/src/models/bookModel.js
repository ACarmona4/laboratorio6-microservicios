import pool from "../config/db.js";

export const findAllBooks = async () => {
  const result = await pool.query('SELECT * FROM books');
  
  // Convert underscore names to camelCase for backwards compatibility
  return result.rows.map(row => ({
    ...row,
    countInStock: row.count_in_stock
  }));
};

export const findBookById = async (id) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  if (result.rows.length === 0) return null;
  
  const row = result.rows[0];
  return {
    ...row,
    countInStock: row.count_in_stock
  };
};