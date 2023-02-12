FROM node:16

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn install && yarn cache clean
COPY . .

EXPOSE 4000

CMD ["yarn", "dev"]
