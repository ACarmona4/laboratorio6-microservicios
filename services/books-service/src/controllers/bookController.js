import { findAllBooks, findBookById } from "../models/bookModel.js";

const toPublicImageUrl = (value) => {
  if (!value) {
    return value;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const baseUrl = (process.env.BOOKS_PUBLIC_BASE_URL || "http://localhost:5001").replace(/\/+$/, "");
  const normalizedPath = value.startsWith("/") ? value : `/public/images/${value}`;

  return `${baseUrl}${normalizedPath}`;
};

const serializeBook = (book) => ({
  ...book,
  image: toPublicImageUrl(book?.image),
});

export const getBookById = async (req, res) => {
  try {
    const book = await findBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(serializeBook(book));
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

    res.status(200).json(books.map(serializeBook));
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
