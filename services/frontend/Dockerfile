FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_GATEWAY_URL=http://localhost:8080/api
ARG VITE_USE_MOCKS=false
ARG VITE_USERS_MODE=api
ARG VITE_APP_NAME=Bookstore Frontend

ENV VITE_API_GATEWAY_URL=$VITE_API_GATEWAY_URL
ENV VITE_USE_MOCKS=$VITE_USE_MOCKS
ENV VITE_USERS_MODE=$VITE_USERS_MODE
ENV VITE_APP_NAME=$VITE_APP_NAME

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
