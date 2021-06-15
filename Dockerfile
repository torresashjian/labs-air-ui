# Stage 1
FROM node:alpine3.13 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Stage 2
FROM nginx:1.21.0-alpine

COPY --from=build-step /app/dist/ProjectAir /usr/share/nginx/html