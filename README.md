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

\`\`\`bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
\`\`\`

## Environment Variables

\`\`\`
DATABASE_URL=
JWT_SECRET=
CLIENT_URL=
SERVER_URL=
SSLCOMMERZ_STORE_ID=
SSLCOMMERZ_STORE_PASSWORD=
SSLCOMMERZ_IS_LIVE=false
STRIPE_SECRET_KEY=
\`\`\`

## Admin Access

Email: admin@platterly.com
Password: admin123
