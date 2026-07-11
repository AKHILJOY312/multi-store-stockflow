# StockFlow

A full-stack MERN application for managing product inventory across multiple stores. The application supports role-based authentication, stock adjustments, atomic stock transfers, and inventory tracking.

---

## Features

- JWT Authentication
- Role-based Authorization (Admin & Shopper)
- Product Management
- Store Management
- Inventory Management
- Stock Adjustment
- Atomic Stock Transfer
- Low Stock Filtering
- Swagger API Documentation
- Automated Tests

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Testing

- Jest
- Supertest
- mongodb-memory-server

---

## Prerequisites

- Node.js 18+
- pnpm
- MongoDB

---

## Clone Repository

```bash
git clone https://github.com/AKHILJOY312/multi-store-stockflow.git

cd multi-store-stockflow
```

---

# Backend Setup

Navigate to the backend.

```bash
cd backend
```

Install dependencies.

```bash
pnpm install
```

Create a `.env` file from `.env.example`.

Start the backend.

```bash
pnpm dev
```

Backend runs on:

```
http://localhost:3000
```

---

# Frontend Setup

Navigate to the frontend.

```bash
cd frontend
```

Install dependencies.

```bash
pnpm install
```

Run the frontend.

```bash
pnpm dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Seed Demo Users

From the backend directory:

```bash
pnpm seed
```

The seed script creates the following demo accounts.

| Role    | Email                                       | Password |
| ------- | ------------------------------------------- | -------- |
| Admin   | [admin@test.com](mailto:admin@test.com)     | 123456   |
| Shopper | [shopper@test.com](mailto:shopper@test.com) | 123456   |

The script is safe to run multiple times.

---

## API Documentation

After starting the backend, Swagger UI is available at:

```
http://localhost:3000/api-docs
```

The OpenAPI specification can be found in:

```
backend/src/docs/openapi.yaml
```

---

## Running Tests

From the backend directory:

```bash
pnpm test
```

The automated test suite covers:

- Stock Adjustment
- Stock Transfer
- Concurrent Stock Updates

---

## Demo Accounts

### Admin

```
Email: admin@test.com
Password: 123456
```

### Shopper

```
Email: shopper@test.com
Password: 123456
```

---

## Assumptions

- Authentication is required for all endpoints except login and registration.
- Demo users are created using the seed script.
- Shopper users have read-only access.
- Admin users can manage products, stores, and inventory.

---

## License

This project was created for a technical assessment.
