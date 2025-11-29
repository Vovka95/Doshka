FROM node:20-alpine AS development

WORKDIR /app

COPY ../../webApi/package.json ./

RUN npm install

COPY ../../webApi .

EXPOSE ${BACKEND_PORT}

CMD ["npm", "run", "start:dev"]
