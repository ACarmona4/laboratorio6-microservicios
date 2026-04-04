import { findAllBooks, findBookById } from "../models/bookModel.js";

export const getBookById = async (req, res) => {
  try {
    const book = await findBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error getting book by id:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await findAllBooks();

    res.status(200).json(books);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};