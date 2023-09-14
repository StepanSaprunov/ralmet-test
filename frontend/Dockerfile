FROM node:20.6-alpine3.17

WORKDIR /app

COPY ./frontend/package*.json .

RUN npm install

COPY ./frontend .

CMD [ "npm", "run", "dev", "--host" ]

