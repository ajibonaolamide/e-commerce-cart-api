🛒 Secured E-Commerce Cart API

A production-style REST API built with Node.js, Express, Prisma, and PostgreSQL.
It supports authentication, role-based access control, product management, shopping cart operations, and checkout integration using Stripe.


🚀 Features
🔐 User authentication (JWT-based)
👥 Role-based access control (User & Admin)
📦 Product CRUD (Admin only for write operations)
🛒 Shopping cart system
Add items to cart
Update quantity
Remove items
Clear cart
Stock validation
🧾 Order system
Cart → Order conversion
Order history per user
💳 Stripe checkout integration
🗄️ PostgreSQL database with Prisma ORM
⚠️ Input validation and proper HTTP status handling


🏗️ Tech Stack
Node.js
Express.js
Prisma ORM
PostgreSQL
JWT Authentication
Stripe API


📁 Project Structure
/controllers
/services
/routes
/middleware
/config
/prisma
server.js


⚙️ Setup Instructions
1. Clone repository
git clone https://github.com/your-username/e-commerce-cart-api.git
cd e-commerce-cart-api
2. Install dependencies
npm install
3. Setup environment variables

Create a .env file:

DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
4. Run Prisma migrations
npx prisma migrate dev
5. Start server
node server.js


🔐 Authentication Flow

Register user → /api/auth/register
Login → /api/auth/login
Token required for protected routes

📦 API Endpoints

Auth
POST /api/auth/register
POST /api/auth/login

Products
GET /api/products
POST /api/products (Admin)
PATCH /api/products/:id (Admin)
DELETE /api/products/:id (Admin)

Cart
POST /api/cart
GET /api/cart
PATCH /api/cart/:id
DELETE /api/cart/:id
DELETE /api/cart/clear

Orders
POST /api/orders
GET /api/orders
GET /api/orders/:id

Checkout
POST /api/payment/checkout


💳 Checkout Flow
User adds items to cart
Calls checkout endpoint
Stripe session is created
User completes payment
Order is created and cart is cleared


👨‍💻 Author

Built by Olamide Ajibona as a Capstone Project.

📌 Notes
Ensure PostgreSQL is running before starting server
Stripe keys must be valid for checkout to work
Admin role is required for product management