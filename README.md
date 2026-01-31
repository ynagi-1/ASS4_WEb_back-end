# Auction 

A full-featured auction web application with RESTful API, JWT authentication, and role-based access control (RBAC).

## ✨ Features

- User registration and authentication (JWT)
- Role-based access control (User & Admin)
- CRUD operations for auction lots and categories
- Lot filtering and sorting
- Category-lot relationships
- Data validation
- Web interface for management

## 🛠 Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- HTML5/CSS3
- Vanilla JavaScript

## 📦 Prerequisites

- Node.js >= 14.x
- MongoDB >= 4.x

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/ynagi-1/ASS4_WEb_back-end.git
cd 4ass_WEB
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
MONGODB_URI=mongodb://localhost:27017/auction_db
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
NODE_ENV=development
```

4. Run the application
```bash
npm start
```

5. Open in browser
```
http://localhost:3000
```

## 📚 API Endpoints

### Authentication

**Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Get Current User**
```http
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN
```

### Lots

**Get All Lots**
```http
GET /api/lots
```

**Get Lot by ID**
```http
GET /api/lots/:id
```

**Create Lot (Admin only)**
```http
POST /api/lots
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Vintage Watch",
  "startBid": 100,
  "description": "Beautiful vintage watch",
  "category": "CATEGORY_ID"
}
```

**Update Lot (Admin only)**
```http
PUT /api/lots/:id
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "currentBid": 150,
  "status": "closed"
}
```

**Delete Lot (Admin only)**
```http
DELETE /api/lots/:id
Authorization: Bearer YOUR_TOKEN
```

### Categories

**Get All Categories**
```http
GET /api/categories
```

**Get Category by ID**
```http
GET /api/categories/:id
```

**Create Category (Admin only)**
```http
POST /api/categories
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Electronics",
  "description": "Electronic devices"
}
```

**Update Category (Admin only)**
```http
PUT /api/categories/:id
Authorization: Bearer YOUR_TOKEN
```

**Delete Category (Admin only)**
```http
DELETE /api/categories/:id
Authorization: Bearer YOUR_TOKEN
```

## 📁 Project Structure

```
4ass_WEB/
├── models/              # Mongoose models
│   ├── User.js
│   ├── Lot.js
│   └── Category.js
├── controllers/         # Business logic
│   ├── authController.js
│   ├── lotController.js
│   └── categoryController.js
├── routes/              # API routes
│   ├── auth.js
│   ├── lots.js
│   └── categories.js
├── middleware/          # Middleware functions
│   ├── auth.js
│   └── errorHandler.js
├── config/              # Configuration
│   └── database.js
├── public/              # Static files
│   └── index.html
├── server.js            # Entry point
├── package.json
└── .env
```

## 🔑 User Roles

### User
- View all lots
- View categories
- View profile

### Admin
- All user permissions
- Create/update/delete lots
- Create/update/delete categories
