import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { booksClient } from '../api/booksClient.js';
import { reviewsClient } from '../api/reviewsClient.js';
import ErrorState from '../components/common/ErrorState.jsx';
import LoadingState from '../components/common/LoadingState.jsx';
import ReviewForm from '../components/reviews/ReviewForm.jsx';
import ReviewList from '../components/reviews/ReviewList.jsx';
import { useUser } from '../context/UserContext.jsx';

const formatMoney = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);

function BookScreen() {
  const { bookId } = useParams();
  const { user } = useUser();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');

  const loadBookData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [bookData, reviewsData] = await Promise.all([
        booksClient.getBookById(bookId),
        reviewsClient.getReviewsByBookId(bookId),
      ]);

      setBook(bookData);
      setReviews(reviewsData);
    } catch (fetchError) {
      setError(fetchError.message || 'No fue posible cargar el detalle del libro');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookData();
  }, [bookId]);

  const handleCreateReview = async ({ rating, comment }) => {
    if (!user?.id) {
      setActionError('No existe un usuario activo para registrar reviews.');
      return;
    }

    setActionError('');
    setIsSubmittingReview(true);
    try {
      const createdReview = await reviewsClient.createReview({
        bookId,
        userId: user.id,
        rating,
        comment,
      });
      setReviews((previous) => [createdReview, ...previous]);
    } catch (submitError) {
      setActionError(submitError.message || 'No se pudo guardar la review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <section className="container page">
        <LoadingState message="Cargando detalle..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container page">
        <ErrorState message={error} onRetry={loadBookData} />
      </section>
    );
  }

  return (
    <section className="container page">
      <Link to="/" className="back-link">
        Volver al catalogo
      </Link>

      <div className="card book-detail">
        <img src={book.image} alt={book.name} className="book-detail-image" />
        <div>
          <h1>{book.name}</h1>
          <p className="muted">{book.author}</p>
          <p>{book.description}</p>
          <p className="price">{formatMoney(book.price)}</p>
          <p className="stock">Stock disponible: {book.countInStock}</p>
          <Link to={`/books/${bookId}/purchase`} className="btn">
            Comprar ahora
          </Link>
        </div>
      </div>

      <div className="two-columns">
        <section className="card">
          <h2>Reviews</h2>
          <ReviewList reviews={reviews} />
        </section>
        <section>
          {actionError ? <ErrorState message={actionError} /> : null}
          <ReviewForm onSubmit={handleCreateReview} isSubmitting={isSubmittingReview} />
        </section>
      </div>
    </section>
  );
}

export default BookScreen;
