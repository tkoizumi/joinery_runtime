FROM node:alpine

WORKDIR /usr/app
COPY package.json ./
RUN npm install -g typescript
RUN npm install

EXPOSE 4001

COPY ./ ./

CMD ["npm", "start"]