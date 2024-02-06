FROM node:14-alpine

WORKDIR /usr/src/app

RUN npm install

RUN npm run-script build

COPY docs /usr/src/app/

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "start" ]
