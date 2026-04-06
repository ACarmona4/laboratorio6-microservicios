import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { booksClient } from '../api/booksClient.js';
import { ordersClient } from '../api/ordersClient.js';
import ErrorState from '../components/common/ErrorState.jsx';
import LoadingState from '../components/common/LoadingState.jsx';
import OrderSummary from '../components/orders/OrderSummary.jsx';
import { useUser } from '../context/UserContext.jsx';

const formatMoney = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);

function PurchaseScreen() {
  const { bookId } = useParams();
  const { user } = useUser();

  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadBook = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await booksClient.getBookById(bookId);
      setBook(response);
      setQuantity(1);
    } catch (fetchError) {
      setError(fetchError.message || 'No fue posible cargar el libro');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBook();
  }, [bookId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.id) {
      setError('No hay un usuario simulado activo.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const response = await ordersClient.createOrder({
        userId: user.id,
        bookId,
        quantity: Number(quantity),
      });
      setCreatedOrder(response.order || null);
    } catch (submitError) {
      setError(submitError.message || 'No se pudo crear la orden');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="container page">
        <LoadingState message="Cargando compra..." />
      </section>
    );
  }

  if (error && !book) {
    return (
      <section className="container page">
        <ErrorState message={error} onRetry={loadBook} />
      </section>
    );
  }

  const quantityTotal = Number(quantity) * Number(book.price);

  return (
    <section className="container page">
      <Link to={`/books/${bookId}`} className="back-link">
        Volver al detalle
      </Link>
      <h1>Flujo de compra</h1>

      <div className="card">
        <h2>{book.name}</h2>
        <p className="muted">{book.author}</p>
        <p>Precio unitario: {formatMoney(book.price)}</p>
        <p>Stock disponible: {book.countInStock}</p>
      </div>

      <form onSubmit={handleSubmit} className="card purchase-form">
        <label htmlFor="quantity">Cantidad</label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={book.countInStock}
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
          disabled={isSubmitting}
        />
        <p>
          Total estimado: <strong>{formatMoney(quantityTotal)}</strong>
        </p>
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Creando orden...' : 'Confirmar compra'}
        </button>
      </form>

      {error && book ? <ErrorState message={error} /> : null}
      <OrderSummary order={createdOrder} />
    </section>
  );
}

export default PurchaseScreen;
