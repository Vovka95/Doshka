# 📦 Doshka — Project Management App (Monorepo)

A project management system built using React, NestJS, and PostgreSQL.
The project is organized as a monorepo, containing both the frontend (webClient) and backend (webApi) inside a single repository.

The development environment is fully containerized using Docker Compose, enabling consistent and reproducible setups across all machines.

## 🚀 Tech Stack

### Frontend (webClient):

-   React + Vite + TypeScript
-   React Query
-   TailwindCSS
-   Axios
-   React Router

### Backend (webApi):

-   NestJS
-   TypeScript
-   TypeORM
-   PostgreSQL
-   JWT Authentication

### Infrastructure:

-   Docker
-   Docker Compose
-   Centralized .env configuration

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
BACKEND_HOST=******

# Web Client
FRONTEND_PORT=******
FRONTEND_HOST=******

# Database
POSTGRES_USER=******
POSTGRES_PASSWORD=******
POSTGRES_DB=******
POSTGRES_PORT=******
POSTGRES_HOST=******

# Node environment
NODE_ENV=development
```

Inside webApi/, create a file named .env.backend:

```
# Nest.js Environment Variables
PORT=******

# Database
DATABASE_HOST=******
DATABASE_PORT=******
DATABASE_USERNAME=******
DATABASE_PASSWORD=******
DATABASE_NAME=******

# JWT
JWT_SECRET=******
JWT_EXPIRES_IN=******
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

-   webApi (NestJS backend) → http://localhost:{BACKEND_PORT}
-   webClient (React frontend) → http://localhost:{FRONTEND_PORT}
-   db (PostgreSQL) → {DATABASE_PORT}
