FROM node:20-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./
COPY webApi/package.json ./webApi/package.json

RUN npm run api:ci

COPY webApi ./webApi

RUN npm run api:build

EXPOSE ${PORT}

CMD ["npm", "run", "api:start:dev"]