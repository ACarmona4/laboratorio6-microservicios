FROM node:20-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

COPY . .

EXPOSE 5003

CMD ["npm", "start"]
