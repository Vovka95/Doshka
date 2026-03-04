FROM node:20-alpine AS development

WORKDIR /app

COPY ../../webApi/package.json ../../webApi/package-lock.json ./

RUN npm install

COPY ../../webApi .

RUN npm run build

EXPOSE ${BACKEND_PORT}

CMD ["npm", "run", "start:dev"]
