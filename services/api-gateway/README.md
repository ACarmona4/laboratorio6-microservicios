# API Gateway

Punto unico de entrada REST para el frontend de Bookstore.

## Responsabilidad

- Exponer rutas REST unificadas para frontend.
- Enrutar peticiones a `books-service`, `reviews-service` y `orders-service`.
- Preparar integracion futura de `users-service` sin romper contratos.
- Manejar CORS, healthcheck y errores basicos de integracion.

## No hace este gateway

- No implementa logica de negocio de dominio.
- No reemplaza validaciones de los microservicios.
- No implementa JWT, autenticacion avanzada, Kafka, service mesh ni circuit breakers.

## Variables de entorno

Copiar `.env.example` a `.env`.

- `PORT`: puerto del gateway (default `8080`)
- `BOOKS_SERVICE_URL`: URL REST base de books-service
- `REVIEWS_SERVICE_URL`: URL REST base de reviews-service
- `ORDERS_SERVICE_URL`: URL REST base de orders-service
- `USERS_SERVICE_ENABLED`: `true|false`
- `USERS_SERVICE_URL`: URL base de users-service futuro
- `SERVICE_TIMEOUT_MS`: timeout para llamadas a servicios

## Rutas expuestas por el gateway

Base: `/api`

- `GET /api/books` -> `GET {BOOKS_SERVICE_URL}/books`
- `GET /api/books/:id` -> `GET {BOOKS_SERVICE_URL}/books/:id`
- `GET /api/books/:id/reviews` -> `GET {REVIEWS_SERVICE_URL}/reviews/book/:id`
- `POST /api/books/:id/reviews` -> `POST {REVIEWS_SERVICE_URL}/reviews`
  - Body enviado: `{ ...body, bookId: :id }`

- `GET /api/reviews/book/:bookId` -> `GET {REVIEWS_SERVICE_URL}/reviews/book/:bookId`
- `POST /api/reviews` -> `POST {REVIEWS_SERVICE_URL}/reviews`
  - Body esperado: `{ bookId, userId, rating, comment }`

- `POST /api/orders` -> `POST {ORDERS_SERVICE_URL}/orders`
  - Body esperado: `{ userId, bookId, quantity }`
- `GET /api/orders/user/:userId` -> `GET {ORDERS_SERVICE_URL}/orders/user/:userId`
- `GET /api/orders/:id` -> `GET {ORDERS_SERVICE_URL}/orders/:id`

- `POST /api/users` -> `POST {USERS_SERVICE_URL}/users`
  - Body esperado: `{ name, email }`
- `GET /api/users`
- `GET /api/users/me`
- `GET /api/users/:id`
- `PUT /api/users/:id`
  - Si `USERS_SERVICE_ENABLED=false`, retorna `501`.
  - Si `USERS_SERVICE_ENABLED=true`, `POST/GET by id/PUT` se reenvian a `{USERS_SERVICE_URL}`.
  - `GET /api/users` y `GET /api/users/me` quedan como placeholders y retornan `501`.

## Health

- `GET /health`
  - Respuesta: `{ service: "api-gateway", status: "ok" }`

## Propagacion de errores

- Si el microservicio responde `4xx/5xx`, el gateway retorna el mismo status y payload.
- Si hay timeout aguas arriba, retorna `504`.
- Si el servicio no esta disponible, retorna `503`.

## Ejecucion local

```bash
npm install
npm run dev
```

## Docker

```bash
docker build -t api-gateway .
docker run --rm -p 8080:8080 --env-file .env api-gateway
```
