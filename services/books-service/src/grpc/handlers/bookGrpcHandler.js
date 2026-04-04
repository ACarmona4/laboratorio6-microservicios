import { findBookById } from "../../models/bookModel.js";

export const checkBookExists = async (call, callback) => {
  try {
    const { bookId } = call.request;

    const book = await findBookById(bookId);

    if (!book) {
      return callback(null, {
        exists: false,
        id: "",
        title: "",
      });
    }

    callback(null, {
      exists: true,
      id: book.id || "",
      title: book.title || "",
    });
  } catch (error) {
    console.error("gRPC error in CheckBookExists:", error);

    callback(error);
  }
};