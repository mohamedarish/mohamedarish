FROM node:latest

WORKDIR /site

COPY package.json .

RUN npm i --save-dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]