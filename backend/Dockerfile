FROM node:20.6-alpine3.17

WORKDIR /app

COPY ./backend/package*.json .

RUN npm install

COPY ./backend .

CMD ["npm", "run", "start:dev"]