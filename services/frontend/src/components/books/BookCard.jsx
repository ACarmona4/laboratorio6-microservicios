import { Link } from 'react-router-dom';

const formatPrice = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);

function BookCard({ book }) {
  return (
    <article className="book-card">
      <img src={book.image} alt={book.name} className="book-image" />
      <div className="book-body">
        <h3>{book.name}</h3>
        <p className="muted">{book.author}</p>
        <p className="price">{formatPrice(book.price)}</p>
        <p className="stock">Stock: {book.countInStock}</p>
        <Link to={`/books/${book.id}`} className="btn">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default BookCard;
