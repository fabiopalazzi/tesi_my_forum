FROM node:14

WORKDIR /app

COPY ./app/package.json ./

RUN npm install

COPY ./app ./

EXPOSE 3001

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]
