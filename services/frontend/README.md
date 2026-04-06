# Frontend Bookstore (Microservices-ready)

Frontend desacoplado para la migracion de Bookstore a microservicios.

## Objetivo

- Mantener la interfaz modular y simple.
- Consumir dominios via capa `api/`.
- Preparar integracion futura con API Gateway y Users Service.

## Arquitectura

- UI React + Vite (independiente del backend).
- `screens/` para vistas de negocio.
- `components/` para piezas reutilizables.
- `api/` como unica capa de acceso HTTP y contratos.
- `context/UserContext` para estado temporal de usuario.
- `mocks/` para continuidad mientras faltan APIs reales.

## Vistas incluidas

- Home / catalogo.
- Detalle de libro.
- Reviews por libro.
- Flujo de compra (crear orden).
- Perfil simulado + historial de ordenes.

## Variables de entorno

Copiar `.env.example` a `.env`.

- `VITE_API_GATEWAY_URL`: URL base REST del API Gateway.
- `VITE_USE_MOCKS`: si es `true`, books/reviews/orders/users usan mock local.
- `VITE_USERS_MODE`: `mock` o `api`.
- `VITE_APP_NAME`: nombre visible en header.

## Ejecucion local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Contenedor

```bash
docker build -t bookstore-frontend .
docker run --rm -p 8080:80 bookstore-frontend
```

Health del frontend contenerizado:

- `GET /health`

## Contratos del API Gateway

Revisar [docs/api-gateway-contracts.md](./docs/api-gateway-contracts.md).

## Estructura

```txt
frontend/
├── docs/
├── public/
├── src/
│   ├── api/
│   │   └── mocks/
│   ├── components/
│   ├── config/
│   ├── context/
│   ├── screens/
│   └── styles/
├── .env.example
├── Dockerfile
├── nginx.conf
├── package.json
└── vite.config.js
```
