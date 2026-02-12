FROM node:20-alpine AS development

WORKDIR /app

COPY ../../webClient/package.json ../../webClient/package-lock.json ./

RUN npm install

COPY ../../webClient .

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "run", "dev", "--", "--host"]
