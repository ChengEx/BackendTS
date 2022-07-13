FROM node:latest

WORKDIR /nodejs/test

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]