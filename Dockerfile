FROM node:18-alpine as build-stage

WORKDIR /app

COPY ./package*.json ./

RUN npm install

FROM node:18-alpine as production-stage

COPY ./dist /app/dist

EXPOSE 3002

CMD [ "node", "/app/dist/src/main" ]