# 📦 Doshka — Project Management App (Monorepo)

A project management system built using React, NestJS, and PostgreSQL.
The project is organized as a monorepo, containing both the frontend (webClient) and backend (webApi) inside a single repository.

The development environment is fully containerized using Docker Compose, enabling consistent and reproducible setups across all machines.

## 🚀 Tech Stack

### Frontend (webClient):

- React + Vite + TypeScript
- React Query
- TailwindCSS
- Axios
- React Router

### Backend (webApi):

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT Authentication

### Infrastructure:

- Docker
- Docker Compose
- Centralized .env configuration

## 🗂️ Monorepo Structure

```
app/
  webApi/            # Backend (NestJS)
    src/
    package.json
    .env.backend
    ...

  webClient/         # Frontend (React + Vite)
    src/
    package.json
    .env.frontend
    ...

  infrastructure/
    docker/
      webApi.Dockerfile
      webClient.Dockerfile
    docker-compose.yml
    .env
```

This monorepo keeps all apps and infrastructure in one place, simplifying development and deployment.

## 📥 Clone the Project & Install Dependencies

First, clone the repository to your local machine:

```
git clone https://github.com/Vovka95/Doshka.git
```

Navigate into the project folder:

```
cd Doshka
```

Install dependencies for both frontend and backend (only required if you want to run without Docker):

```
cd webApi
npm install

cd ../webClient
npm install
```

## 🐳 Running the Project (Docker Compose)

### 1. Add environment variables

Inside infrastructure/, create a file named .env:

```
# Web API
BACKEND_PORT=******

# Web Client
FRONTEND_PORT=******

# Database
DATABASE_PORT=******
DATABASE_USERNAME=******
DATABASE_PASSWORD=******
DATABASE_NAME=******

DATABASE_URL=postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@database:5432/${DATABASE_NAME}
DATABASE_SSL=false
DATABASE_SYNCHRONIZE=false

# Node environment
NODE_ENV=development

PGADMIN_EMAIL=*****
PGADMIN_PASSWORD=*****
PGADMIN_PORT=*****
```

Inside webApi/, create a file named .env.backend:

```
# Nest.js Environment Variables

BACKEND_PORT=4000

# Database
DATABASE_PORT=******
DATABASE_USERNAME=******
DATABASE_PASSWORD=******
DATABASE_NAME=******

DATABASE_URL=postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}
DATABASE_SSL=false
DATABASE_SYNCHRONIZE=false

# JWT
JWT_SECRET=******
JWT_EXPIRES_IN=15m

JWT_REFRESH_SECRET=******
JWT_REFRESH_EXPIRES_IN=7d

# Resend (mailer tool)
EMAIL_FROM=onboarding@resend.dev
RESEND_API_KEY=*****

# Frontend origine
FRONTEND_ORIGIN=*****
```

Inside webClient/, create a file named .env.frontend:

```
VITE_API_URL=*****
VITE_APP_NAME=*****
```

### 2. Start the application

```bash
  cd infrastructure
  docker compose build
  docker compose up
```

This will start:

- webApi (NestJS backend) → http://localhost:{BACKEND_PORT}/api
- API Swagger Docs → http://localhost:{BACKEND_PORT}/api/docs
- webClient (React frontend) → http://localhost:{FRONTEND_PORT}
- db (PostgreSQL) → {DATABASE_PORT}
