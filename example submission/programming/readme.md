# Wallet-API Documentation

### Quick Start

To quickly run the project, utilize the provided default information in the `utils/seed.ts` file. This file contains essential details for accessing the application, as described in the "Accessing the Application" section below.

Choose between `pnpm` or `npm` for package management both options offer the same functionality. However, for faster installations, we recommend using `pnpm`.

## Setup

Start with Docker
```bash
docker-compose up -d
```

Start with Express
```bash
pnpm install 
pnpm dev 
```

## Accessing the Application

### Admin Credentials

Use the following credentials to log in as an admin
- `Email:` admin@example.com
- `Password:` admin123

### User Credentials

To log in as a user, use the following credentials
- `Email:` user1@example.com
- `Password:` user1

## Security System

### Authentication Middleware

The application utilizes a token-based authentication system. Two middleware functions are implemented

- `verifyToken:` This ensures the validity of the authentication token.
- `adminAccess:` Grants access to admin functionalities.
- `userAccess:` Grants access to user functionalities.

### Request Validation Middleware

limitParams

The `limitParams` function is implemented in middlewares/checkRequest.ts. It serves as a request middleware to limit and validate parameters in incoming requests. This ensures that the API handles requests with appropriate parameters, enhancing security and preventing potential issues.

## Installation

Initialize the project
```bash
pnpm init
```

Install Express and related dependencies
```bash
pnpm i express
pnpm i -D @types/node @types/express typescript eslint nodemon ts-node dotenv
```

Install MariaDB and Sequelize
```bash
pnpm i mariadb
pnpm i mysql2 sequelize
```

Install Authentication-related packages
```bash
pnpm i @types/bcrypt bcrypt
pnpm i @types/jsonwebtoken jsonwebtoken
```
