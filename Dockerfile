FROM node:20-alpine
WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install

COPY . .

RUN yarn generate

EXPOSE 3000
CMD ["yarn","start:dev"]
