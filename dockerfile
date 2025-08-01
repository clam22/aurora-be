FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 4000

CMD ["node", "./src/index.js"]