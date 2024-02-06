FROM node:14-alpine

WORKDIR /webApp
COPY . /webApp/

RUN npm install
RUN npm run build




# COPY docs /usr/src/app/

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "start" ]
