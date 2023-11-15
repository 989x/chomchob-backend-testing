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

### Admin Login

Use the following credentials to log in as an administrator
- Email: admin@example.com
- Password: admin123

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
