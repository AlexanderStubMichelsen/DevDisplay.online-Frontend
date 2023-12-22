FROM node:18 as build-stage

WORKDIR /app

COPY package*.json ./app/

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.25

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf