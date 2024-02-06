FROM node:14-alpine

RUN npm install
RUN npm run build

# WORKDIR /webApp



# COPY docs /usr/src/app/

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "start" ]
