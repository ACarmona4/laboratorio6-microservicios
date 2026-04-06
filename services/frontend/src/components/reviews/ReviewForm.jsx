import { useState } from 'react';

function ReviewForm({ onSubmit, isSubmitting }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      rating: Number(rating),
      comment: comment.trim(),
    });
    setComment('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="card review-form">
      <h3>Agregar review</h3>
      <label htmlFor="rating">Rating</label>
      <select
        id="rating"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        disabled={isSubmitting}
      >
        {[5, 4, 3, 2, 1].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor="comment">Comentario</label>
      <textarea
        id="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        rows={3}
        required
        minLength={5}
        placeholder="Comparte tu experiencia con este libro"
        disabled={isSubmitting}
      />

      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Publicar review'}
      </button>
    </form>
  );
}

export default ReviewForm;
