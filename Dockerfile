FROM node:18.17.1-alpha as build

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "build/index.js"]