function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <div className="state-error">
      <p>{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="btn btn-secondary">
          Try again
        </button>
      ) : null}
    </div>
  );
}

export default ErrorState;
