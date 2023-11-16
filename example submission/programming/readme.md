## Wallet-API Documentation

### Setup

Start with Docker
```bash
docker-compose up -d
```

Start with Express
```bash
pnpm install 
pnpm dev 
```

### Accessing the Application

`Admin Credentials`

Use the following credentials to log in as an admin:
- `Email:` admin@example.com
- `Password:` admin123

`User Credentials`

To log in as a user, use the following credentials:
- `Email:` user1@example.com
- `Password:` user1

### Installation

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
