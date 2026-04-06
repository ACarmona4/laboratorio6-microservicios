# users-service

Microservicio REST simple para usuarios, consistente con el resto del proyecto.

## Endpoints

- `GET /health`
- `POST /users`
- `GET /users/:id`
- `PUT /users/:id`

## Modelo de datos

- `id`
- `name`
- `email`
- `createdAt`
- `updatedAt`

## Variables de entorno

- `PORT` (default `5004`)
- `NODE_ENV`
- `AWS_REGION`
- `USERS_TABLE` (default `tb_users`)
