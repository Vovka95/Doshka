FROM node:20-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./
COPY webClient/package.json ./webClient/package.json

RUN npm run web:ci

COPY webClient ./webClient

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "run", "web:dev"]
