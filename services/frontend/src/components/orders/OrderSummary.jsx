const formatMoney = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);

function OrderSummary({ order }) {
  if (!order) {
    return null;
  }

  return (
    <article className="card order-summary">
      <h3>Orden creada</h3>
      <p>
        <strong>ID:</strong> {order.id}
      </p>
      <p>
        <strong>Libro:</strong> {order.bookName}
      </p>
      <p>
        <strong>Cantidad:</strong> {order.quantity}
      </p>
      <p>
        <strong>Total:</strong> {formatMoney(order.total)}
      </p>
      <p>
        <strong>Estado:</strong> {order.status}
      </p>
      <p>
        <strong>Pago:</strong> {order.paymentMethod}
      </p>
      <p className="muted">{new Date(order.createdAt).toLocaleString('es-CO')}</p>
    </article>
  );
}

export default OrderSummary;
