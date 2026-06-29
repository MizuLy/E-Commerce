# E-Commerce Backend API

A RESTful API for a small-scale e-commerce application built with Node.js, Express, Prisma, and PostgreSQL.

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express
- **ORM** — Prisma (PostgreSQL via Neon)
- **Auth** — JWT + HTTP-only cookies
- **Storage** — Cloudinary (image uploads)
- **Email** — Nodemailer (Gmail SMTP)
- **Deployment** — Render

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Cloudinary account
- Gmail account with App Password enabled

### Installation

```bash
git clone https://github.com/MizuLy/E-Commerce.git
cd E-Commerce/backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=your_neon_postgresql_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_16_char_app_password
NODE_ENV=development
PORT=6969
```

### Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

### Run

```bash
npm run dev
```

---

## API Reference

Base URL: `http://localhost:6969/api`

---

### Auth `/api/auth`

| Method | Endpoint           | Auth | Description                                                          |
| ------ | ------------------ | ---- | -------------------------------------------------------------------- |
| POST   | `/register`        | —    | Register a new user. First user gets ADMIN role. Sends OTP to email. |
| POST   | `/login`           | —    | Login. Returns JWT token + sets cookie.                              |
| POST   | `/logout`          | —    | Clears JWT cookie.                                                   |
| PATCH  | `/update-profile`  | ✅   | Update name, phone, address, or profile image.                       |
| PUT    | `/change-email`    | ✅   | Change email. Requires current password.                             |
| PUT    | `/change-password` | ✅   | Change password. Requires current password.                          |

#### Register

```json
POST /api/auth/register
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "secret123"
}
```

#### Login

```json
POST /api/auth/login
{
  "email": "john@gmail.com",
  "password": "secret123"
}
```

#### Update Profile

```
PATCH /api/auth/update-profile
Content-Type: multipart/form-data

name, phone, address, imageUrl (file)
```

---

### Products `/api/products`

| Method | Endpoint    | Auth | Description                            |
| ------ | ----------- | ---- | -------------------------------------- |
| GET    | `/`         | —    | Get all products. Supports pagination. |
| POST   | `/`         | ✅   | Add a product (Admin).                 |
| PATCH  | `/:id`      | ✅   | Update a product (Admin).              |
| DELETE | `/:id`      | ✅   | Remove a product (Admin).              |
| PATCH  | `/:id/view` | —    | Increment product view count.          |

#### Get Products (with pagination)

```
GET /api/products?page=1&limit=8
```

#### Add Product

```
POST /api/products
Content-Type: multipart/form-data

name, description, price, stockQuantity, imageUrl (file)
```

---

### Orders `/api/orders`

| Method | Endpoint      | Auth | Role     | Description             |
| ------ | ------------- | ---- | -------- | ----------------------- |
| POST   | `/`           | ✅   | Customer | Place a new order.      |
| GET    | `/`           | ✅   | Customer | Get own orders.         |
| PATCH  | `/:id`        | ✅   | Customer | Cancel a pending order. |
| GET    | `/all`        | ✅   | Admin    | Get all orders.         |
| PATCH  | `/status/:id` | ✅   | Admin    | Update order status.    |

#### Place Order

```json
POST /api/orders
{
  "items": [
    { "productId": "uuid", "quantity": 2 },
    { "productId": "uuid", "quantity": 1 }
  ]
}
```

#### Update Order Status (Admin)

```json
PATCH /api/orders/status/:id
{
  "status": "SHIPPING"
}
```

Order statuses: `PENDING` → `SHIPPING` → `DELIVERED` → `CANCELLED`

---

### OTP `/api/otp`

| Method | Endpoint   | Auth | Description                      |
| ------ | ---------- | ---- | -------------------------------- |
| POST   | `/request` | —    | Request a new OTP for an email.  |
| POST   | `/verify`  | —    | Verify OTP and activate account. |

```json
POST /api/otp/request
{ "email": "john@gmail.com" }

POST /api/otp/verify
{ "email": "john@gmail.com", "otp": "1234" }
```

---

## Database Schema

- **Users** — id, name, email, password, role, phone, address, imageUrl, isVerified
- **Products** — id, name, description, price, stockQuantity, imageUrl
- **Orders** — id, userId, total, status
- **OrderItems** — id, orderId, productId, quantity, unitPrice
- **Otps** — id, email, otp, expiresAt

## Notes

- Total price is always calculated server-side from DB prices
- Stock is decremented on order and re-incremented on cancellation
- First registered user automatically receives ADMIN role
- OTP expires in 5 minutes
- Images are uploaded to Cloudinary via memory buffer (no local storage)
