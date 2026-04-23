FROM nginx:alpine

# Copiar la configuracion de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
