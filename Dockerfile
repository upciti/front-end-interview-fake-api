FROM node:18.20.7-alpine3.21

MAINTAINER Samuel MARLHENS <samuel.marlhens@upciti.com>

WORKDIR /usr/src/app

COPY .npmrc ./
COPY package*.json ./

RUN npm ci --no-progress --ignore-scripts

COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
