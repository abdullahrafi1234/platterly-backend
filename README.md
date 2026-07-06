# Platterly — Backend API

Backend API for Platterly, a full-stack food ordering platform where customers can browse meals, place orders, and pay online, while providers manage their menus and admins oversee the platform.

## Live URL

https://platterly-backend.onrender.com

## Features

- JWT-based authentication with httpOnly cookies
- Role-based access control (Customer, Provider, Admin)
- Full meal management with search, category, and price filters
- Order lifecycle management with status tracking
- Verified customer reviews
- Admin controls for users and orders
- Online payments via SSLCommerz and Stripe

## Tech Stack

Node.js · Express · TypeScript · PostgreSQL · Prisma · JWT · Zod

## Getting Started

### Clone the repository

\`\`\`bash
git clone https://github.com/abdullahrafi1234/platterly-frontend.git
cd platterly-backend
\`\`\`

### Install dependencies

\`\`\`bash
npm install
\`\`\`

### Configure environment variables

Create a \`.env\` file in the root directory:
\`\`\`
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password
SSLCOMMERZ_IS_LIVE=false
STRIPE_SECRET_KEY=your_stripe_secret_key
\`\`\`

### Set up the database

\`\`\`bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
\`\`\`

### Run the development server

\`\`\`bash
npm run dev
\`\`\`
Server will start on \`http://localhost:5000\`

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Admin Access

Email: admin@platterly.com
Password: admin123
