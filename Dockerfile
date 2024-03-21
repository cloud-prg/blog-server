# build-stage
FROM node:20-alpine as build-stage

# ENV TZ=Asia/Shanghai \
#   DEBIAN_FRONTEND=noninteractive

RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g npm@latest

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY ./dist/src ./dist/src

# prod-stage
FROM node:18-alpine as prod-stage
WORKDIR /usr/app

COPY --from=build-stage /usr/app .

CMD ["node","dist/src/main.js"]