function ReviewList({ reviews }) {
  if (!reviews.length) {
    return <p className="muted">Este libro aun no tiene reviews.</p>;
  }

  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <li key={review.id} className="review-item">
          <div className="review-meta">
            <strong>{review.rating}/5</strong>
            <span>{new Date(review.createdAt).toLocaleString('es-CO')}</span>
          </div>
          <p>{review.comment}</p>
          <small className="muted">Usuario: {review.userId}</small>
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;
