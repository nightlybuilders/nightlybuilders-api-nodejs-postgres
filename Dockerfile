FROM node:8.11.3-jessie as builder

RUN npm install -g yarn

RUN mkdir /app/
COPY package.json /app/
COPY yarn.lock /app/

WORKDIR /app/
RUN yarn

COPY .babelrc /app/
COPY src /app/src

CMD ["node", "."]
