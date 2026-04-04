import { findBookById } from "../../models/bookModel.js";

export const getBookById = async (call, callback) => {
  try {
    const { bookId } = call.request;

    const book = await findBookById(bookId);

    if (!book) {
      return callback(null, {
        exists: false,
        id: "",
        name: "",
        price: 0,
        countInStock: 0,
      });
    }

    callback(null, {
      exists: true,
      id: String(book.id || ""),
      name: String(book.name || ""),
      price: Number(book.price || 0),
      countInStock: Number(book.countInStock || 0),
    });
  } catch (error) {
    console.error("gRPC error in GetBookById:", error);
    callback(error);
  }
};