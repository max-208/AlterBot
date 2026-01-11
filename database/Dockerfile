FROM node:latest
LABEL authors="awing"
RUN apt update && apt install -y sqlite3 libsqlite3-dev
RUN mkdir -p /var/database
WORKDIR /var/database
COPY package.json /var/database
RUN npm install --build-from-source --sqlite=/usr/local
COPY . /var/database

ENTRYPOINT ["node", "index.js"]