# syntax=docker/dockerfile:1.5
FROM node:18-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .
EXPOSE 3000 8080
CMD ["node", "escape_room_controller.js"]
