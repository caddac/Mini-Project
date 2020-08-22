FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY ./ .
RUN yarn build

FROM nginx as production
RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf