## 🔍 Gitsearch

**Gitsearch** is a multi-package application built with NestJS and React, managed using Lerna, all containerized using Docker for easy run and development.

#### Stack

- [lerna](https://github.com/lerna/lerna): Monorepo management for multiple packages.
- [React](https://github.com/facebook/react): Frontend library for building the user interface.
- [NestJS](https://github.com/nestjs/nest): Backend framework for APIs and services.
- [TypeORM](https://github.com/typeorm/typeorm): ORM for secure and flexible database interaction.
- [Docker](https://github.com/docker): Containerization for streamlined development and deployment.

## 🚀 Project setup

```bash
# Set up environment variables
$ cp packages/backend/.env.example packages/backend/.env

# Start the development environment using Docker
$ docker compose up
```

## 🎮 How to Use

1. Ensure Docker containers is running.

2. Open your browser and navigate to: http://localhost:5173/

3. Use the search interface to query GitHub users by username.

4. The last 5 profiles searched will be displayed on the interface.
