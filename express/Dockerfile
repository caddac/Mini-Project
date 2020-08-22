FROM node:12

WORKDIR /app

COPY package.json ./
RUN yarn
COPY . .

EXPOSE 8080

CMD ["node", "index.js"]