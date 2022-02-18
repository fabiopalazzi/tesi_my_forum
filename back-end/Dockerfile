FROM node:14

WORKDIR /app

COPY ./app/package.json ./

RUN npm -q install

COPY ./app ./

EXPOSE 3000

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]
