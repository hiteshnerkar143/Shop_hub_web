# 🛍️ ShopHub - MERN Stack eCommerce Application

A complete, production-ready eCommerce application built with the MERN stack featuring OTP-based authentication, product catalog, shopping cart, and checkout functionality.

## ✨ Features

### 🔐 Authentication
- **OTP-based Registration**: 6-digit OTP verification for signup
- **2-Step Login**: Email/password + OTP verification
- **JWT Token Authentication**: Secure API access
- **Password Hashing**: bcryptjs for secure password storage
- **Email Notifications**: Nodemailer for OTP delivery

### 🛒 eCommerce Features
- **Product Catalog**: Browse products with search and filters
- **Category Filtering**: Filter by Electronics, Clothing, Books, Home, Sports
- **Product Sorting**: Sort by price, rating, newest
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Complete checkout with shipping and payment details
- **Order Summary**: View order details before purchase

### 🎨 UI/UX
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern CSS**: Beautiful gradient designs and smooth animations
- **Loading States**: Spinner and loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success and error alerts

### 📊 Admin Features
- **Product Management**: Add, edit, delete products
- **Admin Routes**: Protected admin-only endpoints

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling with Poppins font
- **localStorage** - Token persistence

## 📁 Project Structure

```
Webtech Project/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── cartController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── cartRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── email.js
│   ├── config.js
│   ├── server.js
│   ├── seedProducts.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── ProductCard.js
    │   │   ├── CartItem.js
    │   │   ├── OTPInput.js
    │   │   └── ProtectedRoute.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Signup.js
    │   │   ├── VerifySignupOTP.js
    │   │   ├── Login.js
    │   │   ├── VerifyLoginOTP.js
    │   │   ├── Products.js
    │   │   ├── Cart.js
    │   │   └── Checkout.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   └── globals.css
    │   ├── App.js
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Gmail account with App Password

### Step 1: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Edit .env with your configuration:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
OTP_EXPIRE=300000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=your_email@gmail.com
FRONTEND_URL=http://localhost:3000

# Start MongoDB (if running locally)
# Windows
mongod

# macOS/Linux
mongod

# Seed sample products
npm install  # if not done already
node seedProducts.js

# Start backend server
npm run dev
# Server will run on http://localhost:5000
```

### Step 2: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional, uses default)
# .env.local
REACT_APP_API_URL=http://localhost:5000/api

# Start frontend development server
npm start
# Frontend will open at http://localhost:3000
```

## 📧 Email Configuration (Gmail)

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Step Verification
3. Create an App Password for Node.js
4. Copy the 16-character password
5. Add to `.env` as `EMAIL_PASSWORD`

## 🔑 Test Credentials

### Signup Test
- **Email**: test@example.com
- **Password**: Test@123
- **OTP**: Check console output (backend logs OTP for testing)

### Products
Sample products are seeded automatically via `seedProducts.js`

## 📡 API Endpoints

### Authentication Routes
```
POST   /api/auth/signup              - User signup
POST   /api/auth/verify-signup       - Verify signup OTP
POST   /api/auth/login               - User login
POST   /api/auth/verify-login        - Verify login OTP
POST   /api/auth/resend-otp          - Resend OTP
```

### Product Routes
```
GET    /api/products                 - Get all products
GET    /api/products/:id             - Get product by ID
POST   /api/products                 - Create product (admin)
PUT    /api/products/:id             - Update product (admin)
DELETE /api/products/:id             - Delete product (admin)
```

### Cart Routes (Protected)
```
GET    /api/cart                     - Get user cart
POST   /api/cart/add                 - Add to cart
POST   /api/cart/update              - Update quantity
POST   /api/cart/remove              - Remove from cart
POST   /api/cart/clear               - Clear cart
```

## 🧪 Testing Flow

### Complete User Journey
1. **Signup**
   - Visit http://localhost:3000
   - Click "Sign Up"
   - Enter details and submit
   - Check backend console for OTP (in development mode)
   - Enter OTP on verification page

2. **Login**
   - Click "Login"
   - Enter email and password
   - Enter OTP from email/console

3. **Shopping**
   - Browse products on Products page
   - Filter by category or search
   - Click "Add to Cart"
   - Update quantities
   - Proceed to checkout

4. **Checkout**
   - Fill shipping details
   - Enter card details (demo mode accepts any)
   - Click "Complete Purchase"
   - See success message with Order ID

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ OTP expiry validation (5 minutes)
- ✅ Protected routes
- ✅ CORS configured
- ✅ Environment variables for secrets
- ✅ Input validation on frontend and backend

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Solution: Ensure MongoDB is running
Windows: mongod
macOS: brew services start mongodb-community
Cloud: Use MongoDB Atlas connection string
```

### Email Not Sending
```
Solution: 
1. Check Gmail App Password is correct
2. Enable Less Secure Apps if needed
3. Check EMAIL_USER matches
4. Verify SMTP credentials
```

### CORS Error
```
Solution: Ensure FRONTEND_URL in backend .env is correct
Already handled in backend, but verify headers
```

### Token Issues
```
Solution:
1. Clear localStorage in browser console
2. Logout and login again
3. Check JWT_SECRET is set in .env
```

## 🎯 Future Enhancements

- Payment Gateway Integration (Stripe, Razorpay)
- User Profile & Order History
- Product Reviews & Ratings
- Wishlist Feature
- Admin Dashboard
- Email Newsletter
- Social Login (Google, Facebook)
- Real-time Notifications
- Inventory Management
- Refund System

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a complete MERN stack learning project.

## 🤝 Support

For issues or questions, please check:
1. Terminal/Console for error messages
2. Browser DevTools Network tab
3. Backend logs
4. MongoDB connection

---

**Happy Shopping! 🛍️**
