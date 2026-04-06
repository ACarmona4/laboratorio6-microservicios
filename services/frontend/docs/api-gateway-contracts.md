# Contratos REST Esperados Del API Gateway

Este frontend asume que el API Gateway expone los siguientes endpoints base en:

`{VITE_API_GATEWAY_URL}`

Ejemplo local: `http://localhost:8080/api`

## Health

- `GET /health`
  - Respuesta: `{ service: "api-gateway", status: "ok" }`

## Books

- `GET /books`
  - Respuesta: lista de libros:
  - `[{ id, name, author, image, description, price, countInStock }]`
- `GET /books/:id`
  - Respuesta: detalle de libro:
  - `{ id, name, author, image, description, price, countInStock }`

## Reviews

- `GET /reviews/book/:bookId`
  - Respuesta:
  - `[{ id, bookId, userId, rating, comment, createdAt }]`
- `POST /reviews`
  - Request:
  - `{ bookId, userId, rating, comment }`
  - Respuesta:
  - `{ id, bookId, userId, rating, comment, createdAt }`

## Orders

- `POST /orders`
  - Request:
  - `{ userId, bookId, quantity }`
  - Respuesta esperada compatible con servicio actual:
  - `{ message, order: { id, userId, bookId, bookName, quantity, unitPrice, total, status, paymentMethod, createdAt } }`
- `GET /orders/user/:userId`
  - Respuesta:
  - `[{ id, userId, bookId, bookName, quantity, unitPrice, total, status, paymentMethod, createdAt }]`
- `GET /orders/:id`
  - Respuesta:
  - `{ id, userId, bookId, bookName, quantity, unitPrice, total, status, paymentMethod, createdAt }`

## Users

- `POST /users`
  - Request: `{ name, email }`
  - Respuesta: `{ id, name, email, createdAt, updatedAt }`
- `GET /users/:id`
  - Respuesta: `{ id, name, email, createdAt, updatedAt }`
- `PUT /users/:id`
  - Request: `{ name, email }`
  - Respuesta: `{ id, name, email, createdAt, updatedAt }`
