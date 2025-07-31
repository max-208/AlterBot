FROM node:latest
RUN apt update && apt install -y sqlite3 libsqlite3-dev
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot
COPY package.json /usr/src/bot
RUN npm install --build-from-source --sqlite=/usr/local
COPY . /usr/src/bot
CMD ["node", "index.js"]