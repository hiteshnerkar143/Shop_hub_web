# 🎯 COMPLETE SETUP GUIDE WITH COMMANDS

## STEP 1: Environment Preparation

### Install Prerequisites

**Windows:**
```bash
# Install Node.js from https://nodejs.org
# Install MongoDB from https://www.mongodb.com/try/download/community

# Verify installation
node --version
npm --version
```

**macOS:**
```bash
# Using Homebrew
brew install node
brew install mongodb-community

# Verify installation
node --version
npm --version
```

**Ubuntu/Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y mongodb-org

# Verify installation
node --version
npm --version
```

---

## STEP 2: MongoDB Setup

### Option A: Local MongoDB

**Windows:**
```bash
# Start MongoDB
mongod

# Keep this terminal open - MongoDB is running
```

**macOS:**
```bash
# Start MongoDB service
brew services start mongodb-community

# Verify it's running
brew services list
```

**Ubuntu/Linux:**
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

**Test MongoDB Connection:**
```bash
# Open new terminal
mongosh

# You should see:
# test> 
# Type 'exit' to close

exit
```

### Option B: MongoDB Atlas (Cloud) - RECOMMENDED

```bash
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a cluster (FREE tier available)
4. Click "Connect"
5. Choose "Connection String"
6. Copy the string like:
   mongodb+srv://username:password@cluster.mongodb.net/ecommerce
7. Save this for backend .env file
```

---

## STEP 3: Gmail Setup for Email Service

```bash
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
   - Click on "2-Step Verification"
   - Follow the setup wizard
3. Go to https://myaccount.google.com/apppasswords
4. Select:
   - App: "Mail"
   - Device: "Windows Computer" (or your device)
5. Copy the 16-character password shown
6. Save this password for backend .env
```

**Example:**
- EMAIL_USER: yourname@gmail.com  
- EMAIL_PASSWORD: xxxx xxxx xxxx xxxx (the 16-char password)

---

## STEP 4: Backend Installation

```bash
# Navigate to backend directory
cd backend

# Install all npm packages
npm install

# Output should show:
# added 123 packages, and audited 123 packages

# Create .env file
# On Windows:
echo. > .env

# On macOS/Linux:
touch .env

# Edit .env file with your text editor and add:
```

### Backend .env Content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

JWT_SECRET=MySecretKey12345ChangeInProduction
JWT_EXPIRE=7d
OTP_EXPIRE=300000

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx

FRONTEND_URL=http://localhost:3000
```

### Seed Sample Products:
```bash
# Still in backend directory
node seedProducts.js

# Expected output:
# ✅ MongoDB Connected: localhost
# Cleared existing products
# ✅ 10 products added to database
# 1. Wireless Headphones - ₹4999 (Electronics)
# 2. Smart Watch - ₹9999 (Electronics)
# ... (more products)
```

### Start Backend Server:
```bash
# Still in backend directory
npm run dev

# Expected output:
# ✅ Server running on port 5000
# ✅ Open http://localhost:5000 in your browser
# ✅ MongoDB Connected: localhost
```

✅ Backend is now running!
Terminal should show: "Server running on port 5000"

---

## STEP 5: Frontend Installation

### Open a NEW Terminal Window:

```bash
# Navigate to frontend directory
cd frontend

# Install all npm packages
npm install

# Output should show:
# added 456 packages, and audited 456 packages

# Optional: Create .env.local
touch .env.local
# Add: REACT_APP_API_URL=http://localhost:5000/api

# Start frontend development server
npm start

# The browser should automatically open
# If not, manually go to http://localhost:3000
```

✅ Frontend is now running!
Browser should open at: http://localhost:3000

---

## STEP 6: Verify Both Servers Are Running

### Terminal 1 (Backend):
```
✅ Server running on port 5000
✅ MongoDB Connected: localhost
```

### Terminal 2 (Frontend):
```
Compiled successfully!

You can now view ecommerce-frontend in the browser.

  Local:            http://localhost:3000
  ...
```

### Browser:
- Go to http://localhost:3000
- You should see the ShopHub home page

---

## STEP 7: Test Complete Flow

### Test 1: User Sign Up
```
1. Click "Sign Up" button
2. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@123
   - Confirm: Test@123
3. Check BACKEND TERMINAL for OTP
   Output: "✅ Email sent to test@example.com"
4. Copy the 6-digit OTP from terminal
5. Enter it on the OTP verification page
6. ✅ Account created successfully
```

### Test 2: User Login
```
1. Go to Login page
2. Enter:
   - Email: test@example.com
   - Password: Test@123
3. Check BACKEND TERMINAL for OTP
4. Enter the OTP on next page
5. ✅ Logged in successfully
6. Redirected to Products page
```

### Test 3: Shop for Products
```
1. Browse products on Products page
2. Filter by:
   - Category (Electronics, Clothing, etc.)
   - Search (type "headphones")
   - Sort (Price Low-High, Rating)
3. Click "Add to Cart" on any product
4. Select quantity and confirm
5. ✅ Product added to cart (toast message)
```

### Test 4: Manage Cart
```
1. Click Cart in navbar
2. You should see added products
3. Delete items or update quantities
4. Cart total updates automatically
5. ✅ Cart working correctly
```

### Test 5: Checkout
```
1. Click "Proceed to Checkout"
2. Fill shipping details:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Address: 123 Main Street
   - City: New York
   - State: NY
   - Zip: 10001
3. Fill fake card details:
   - Card: 1234 5678 9012 3456
   - Expiry: 12/25
   - CVV: 123
4. Click "Complete Purchase"
5. ✅ Order placed successfully
6. See Order ID in alert
```

---

## 📊 Verify Installation Completed

Add checkmarks (✓) as you complete each step:

```
Backend Installation:
- [ ] Node.js installed
- [ ] MongoDB installed/running
- [ ] npm install completed
- [ ] .env file created
- [ ] Sample data seeded
- [ ] Backend server running

Frontend Installation:
- [ ] npm install completed
- [ ] Frontend server running
- [ ] http://localhost:3000 loads

Testing:
- [ ] Sign up works
- [ ] OTP verification works
- [ ] Login works
- [ ] Products display
- [ ] Cart operations work
- [ ] Checkout works
```

---

## 🆘 Troubleshooting Commands

### Port Already in Use
```bash
# Find and kill process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For macOS/Linux:
lsof -i :5000
kill -9 <PID>

# Or change the port in .env:
PORT=5001
```

### Clear npm Cache
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Check MongoDB Status
```bash
# Windows:
get-service MongoDB

# macOS:
brew services list

# Ubuntu:
sudo systemctl status mongod
```

### View Backend Logs
```bash
# The terminal running 'npm run dev' shows real-time logs
# Look for errors starting with ❌
```

### View Frontend Logs
```bash
# The terminal running 'npm start' shows compilation errors
# Check browser console: F12 > Console tab
```

### Reset Database
```bash
# In backend directory
node seedProducts.js
# This clears and reseeds all products
```

---

## 🎬 Start Fresh (Reset Everything)

```bash
# Backend
cd backend
rm -rf node_modules
npm install
node seedProducts.js
npm run dev

# Frontend (in new terminal)
cd frontend
rm -rf node_modules
npm install
npm start
```

---

## 📱 Project URLs

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:3000 | Web application |
| Backend API | http://localhost:5000 | REST API |
| Test API | http://localhost:5000/api/products | Get all products |

---

## ✅ You're All Set!

Your MERN eCommerce application is now fully installed and running!

### Quick Commands Reference
```bash
# Backend - Terminal 1
cd backend && npm run dev

# Frontend - Terminal 2  
cd frontend && npm start

# Stop - Ctrl+C in both terminals
# Restart - Run the commands above again
```

For detailed documentation, see README.md
For quick reference, see QUICK_START.md

---

**Happy Coding! 🚀**
