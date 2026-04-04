# 🚀 Quick Start Guide - ShopHub eCommerce App

## 1️⃣ INITIAL SETUP (First Time Only)

### Install Required Software
- Download **Node.js** from https://nodejs.org (v14+)
- Download **MongoDB Community** from https://www.mongodb.com/try/download/community
- Setup **Gmail App Password** (see section below)

### MongoDB Setup

**Windows:**
```bash
# MongoDB installs automatically at C:\Program Files\MongoDB
# Start MongoDB:
mongod
```

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Cloud (Recommended):**
- Go to https://www.mongodb.com/cloud/atlas
- Create free account
- Create a cluster
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce`

### Gmail App Password Setup

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification**
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Save this password for `.env` setup

---

## 2️⃣ BACKEND SETUP

```bash
# Open terminal in backend folder
cd backend

# Install all dependencies
npm install

# Create .env file
# Windows: type .env (or create manually)
# macOS/Linux: touch .env

# Edit .env with these values:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

JWT_SECRET=super_secret_key_12345_change_in_production
JWT_EXPIRE=7d
OTP_EXPIRE=300000

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password_here
EMAIL_FROM=your_email@gmail.com

FRONTEND_URL=http://localhost:3000

# Seed sample products to database
node seedProducts.js
# Output: "✅ 10 products added to database"

# Start backend server
npm run dev
# Output: "✅ Server running on port 5000"
# Output: "✅ MongoDB Connected: localhost"
```

✅ Backend is now running at **http://localhost:5000**

---

## 3️⃣ FRONTEND SETUP

Open a NEW terminal window:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm start
```

✅ Frontend will automatically open at **http://localhost:3000**

---

## 4️⃣ TESTING THE APPLICATION

### A. Test Signup & OTP Verification
1. Click "Sign Up"
2. Enter:
   - Name: John Doe
   - Email: test@example.com
   - Password: Test@123
   - Confirm: Test@123
3. Click "Sign Up"
4. Check **backend terminal** for OTP (printed there for testing)
5. Enter the 6-digit OTP
6. ✅ Account created!

### B. Test Login
1. Click "Login"
2. Enter email and password
3. Enter OTP from terminal or check email
4. ✅ Logged in!

### C. Test Shopping
1. Go to "Products" page
2. Filter by category or search
3. Click "Add to Cart"
4. Go to "Cart"
5. Update quantities
6. Click "Proceed to Checkout"
7. Fill shipping details
8. Use fake card: 1234 5678 9012 3456
9. Click "Complete Purchase"
10. ✅ Order placed!

---

## 📱 Project URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Test | http://localhost:5000/api/products |

---

## 🛑 STOP/RESTART

### To Stop the Application
```bash
# Press Ctrl+C in both terminal windows
```

### To Restart
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm start
```

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module 'express'"
```bash
Solution: npm install
```

### Issue: "MongoDB connection failed"
- Check if MongoDB is running (mongod command)
- Or use MongoDB Atlas connection string in .env

### Issue: "Email not sending"
- Verify Gmail App Password is correct
- Check EMAIL_USER matches your Gmail
- Ensure 16-character password is used

### Issue: Port 5000 already in use
```bash
# Change PORT in backend/.env to different value like 5001
PORT=5001
```

### Issue: Port 3000 already in use
```bash
# Set environment variable to use different port
set PORT=3001  (Windows)
export PORT=3001  (macOS/Linux)
npm start
```

### Issue: Blank page on http://localhost:3000
- Check frontend terminal for errors
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser console (F12)

---

## 📚 Sample Data

### Sample Product Categories
- Electronics (Headphones, Smartwatch, USB Cable)
- Clothing (T-Shirt)
- Sports (Running Shoes, Yoga Mat)
- Books (The Great Gatsby, Learn JavaScript)
- Home (LED Lamp, Coffee Maker)

### Test Credentials
```
Email: test@example.com
Password: Test@123
OTP: Check backend terminal output
```

---

## 🎯 Project Features Completed

✅ OTP-based Authentication (Signup)
✅ 2-Step Login (Login + OTP)
✅ JWT Token Management
✅ Product Catalog
✅ Search & Filter
✅ Shopping Cart
✅ Checkout
✅ Responsive Design
✅ Error Handling
✅ Email Service
✅ Password Hashing
✅ Protected Routes
✅ Admin API endpoints

---

## 📞 Need Help?

1. Check backend terminal for error messages
2. Check browser console (F12)
3. Check Network tab in DevTools
4. Review MongoDB logs
5. Verify all .env variables are set correctly

---

## 🎉 You're All Set!

Your complete MERN eCommerce application is ready. Start developing! 🚀

For detailed documentation, see README.md
