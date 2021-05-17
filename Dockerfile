# base image
FROM node:lts-alpine3.13

#install necessary tools
RUN apk add curl
RUN apk add --no-cache --upgrade bash

# select workdir
WORKDIR /usr/app

# install deps
COPY package*.json ./

RUN npm install

# bundle app src //copied afterwards for better docker caching idk
COPY . .

# expose port
STOPSIGNAL SIGTERM
CMD ["node", "sharding.js"]