import { useEffect, useState } from 'react';
import BookCard from '../components/books/BookCard.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import LoadingState from '../components/common/LoadingState.jsx';
import { booksClient } from '../api/booksClient.js';

function HomeScreen() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBooks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await booksClient.getBooks();
      setBooks(data);
    } catch (fetchError) {
      setError(fetchError.message || 'No fue posible cargar el catalogo');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <section className="container page">
      <h1>Catalogo de libros</h1>
      <p className="muted">
        Vista de entrada para la Bookstore. Consume el dominio de libros via API Gateway.
      </p>

      {isLoading ? <LoadingState message="Cargando catalogo..." /> : null}
      {!isLoading && error ? <ErrorState message={error} onRetry={loadBooks} /> : null}

      {!isLoading && !error ? (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default HomeScreen;
