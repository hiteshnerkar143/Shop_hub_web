# 🎯 COMMAND REFERENCE GUIDE

Save this file for quick commands!

---

## 📥 INITIAL SETUP (First Time)

### Install Backend
```bash
cd backend
npm install
npm run dev
```

### Install Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```

### Seed Database
```bash
cd backend
node seedProducts.js
```

---

## 🎬 RUNNING THE APPLICATION

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```

Expected Output:
```
✅ Server running on port 5000
✅ MongoDB Connected: localhost
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm start
```

Expected Output:
```
Compiled successfully!
Local: http://localhost:3000
```

---

## 🔧 COMMON TASKS

### Reset Database
```bash
cd backend
node seedProducts.js
```

### Clear Cache & Reinstall
```bash
rm -rf node_modules
npm cache clean --force
npm install
```

### Check if MongoDB is Running
```bash
# Windows:
get-service MongoDB

# macOS:
brew services list

# Ubuntu:
sudo systemctl status mongod
```

### Kill Process on Port
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

### Find Open Ports
```bash
# Windows:
netstat -ano | findstr :5000

# macOS/Linux:
lsof -i :5000
```

---

## 🔍 TROUBLESHOOTING COMMANDS

### Clear npm Cache
```bash
npm cache clean --force
```

### Check Node Version
```bash
node --version
npm --version
```

### Check MongoDB Connection
```bash
mongosh
show dbs
exit
```

### View Backend Logs
```
Check the terminal where 'npm run dev' is running
Look for errors starting with ❌
```

### View Frontend Logs
```
Check the terminal where 'npm start' is running
Or open browser console: F12 > Console tab
```

### Test API Endpoint
```
Open browser and visit:
http://localhost:5000/api/products
```

---

## 🌐 PROJECT URLS

| Component | URL |
|-----------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Test | http://localhost:5000/api/products |
| MongoDB Local | mongodb://localhost:27017 |

---

## 📝 FILE EDITING

### Create/Edit .env (Backend)
```bash
# Windows:
echo. > .env

# macOS/Linux:
touch .env
```

Then add these values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
OTP_EXPIRE=300000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000
```

---

## 🧪 QUICK TEST COMMANDS

### Test Sign Up
```bash
1. Go to http://localhost:3000
2. Click Sign Up
3. Fill form and submit
4. Check backend console for OTP
5. Enter OTP on verification page
```

### Test Login
```bash
1. Click Login
2. Enter credentials
3. Check backend console for OTP
4. Enter OTP
```

### Test API
```bash
# Get all products
curl http://localhost:5000/api/products

# On Windows (PowerShell):
Invoke-WebRequest http://localhost:5000/api/products
```

---

## 📊 DIRECTORY NAVIGATION

### Go to Backend
```bash
cd backend
```

### Go to Frontend
```bash
cd frontend
```

### Go to Project Root
```bash
cd ..
```

### List Files
```bash
# Windows:
dir

# macOS/Linux:
ls -la
```

---

## 💾 DATABASE COMMANDS

### Backup Data
```bash
# MongoDB export
mongodump --out /backup/mongodb
```

### Connect to MongoDB
```bash
mongosh
# or
mongo
```

### Show all databases
```
show dbs
```

### Use ecommerce database
```
use ecommerce
```

### Show collections
```
show collections
```

### View users
```
db.users.find()
```

### View products
```
db.products.find()
```

### Clear collection
```
db.users.deleteMany({})
```

---

## 🔄 RESTART EVERYTHING

### Quick Restart
```bash
# Press Ctrl+C in both terminals
# Then run again:

# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm start
```

### Full Clean Restart
```bash
# Backend
cd backend
rm -rf node_modules
npm install
node seedProducts.js
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules
npm install
npm start
```

---

## 🚀 DEPLOYMENT PREVIEW

### Build Frontend
```bash
cd frontend
npm run build
# Creates optimized build in build/ folder
```

### Test Production Build Locally
```bash
cd frontend
npm install -g serve
serve -s build
```

---

## 📱 MOBILE TESTING

### Test Responsive Design
```bash
1. Open http://localhost:3000 in browser
2. Press F12 (Developer Tools)
3. Click device toolbar (mobile preview)
4. Select different devices
5. Test all features
```

---

## 🔐 SECURITY CHECK

### Change JWT Secret (Before Production)
```bash
1. Generate random string: echo $RANDOM$RANDOM
2. Update backend/.env JWT_SECRET
3. Restart backend
```

### Change Admin Credentials
```bash
Update in backend/server.js if needed
```

---

## 📊 MONITORING

### Monitor Backend in Real-time
```bash
npm run dev
# Automatically restarts on file changes
```

### Monitor Frontend
```bash
npm start
# Hot reloads on file changes
```

---

## 🆘 HELP COMMANDS

### Check Backend Health
```bash
curl http://localhost:5000
# Should return: "✅ eCommerce API is running"
```

### Check Frontend Health
```bash
Visit http://localhost:3000 in browser
```

### View npm Scripts
```bash
cd backend
npm run
# Shows all available scripts

cd frontend
npm run
```

---

## 🔗 USEFUL LINKS

- Node.js: https://nodejs.org
- MongoDB: https://mongodb.com
- Express: https://expressjs.com
- React: https://react.dev
- Axios: https://axios-http.com
- MongoDB Atlas: https://mongodb.com/cloud/atlas

---

## 🎯 DAILY WORKFLOW

### Morning: Start Development
```bash
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm start

# Open http://localhost:3000
```

### Make Changes
```bash
# Edit files - auto reloads!
# Frontend: Changes appear instantly
# Backend: Restarts on save
```

### Test Changes
```bash
# Frontend: Refresh browser
# Backend: Check console logs
```

### Before Committing
```bash
cd backend
npm run build (if applicable)

cd frontend
npm run build
```

### Evening: Stop Development
```bash
# Press Ctrl+C in both terminals
```

---

## 📚 COMMAND CHEAT SHEET

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm start` | Start development server |
| `npm run dev` | Start with auto-reload |
| `npm run build` | Create production build |
| `npm cache clean` | Clear cache |
| `node seedProducts.js` | Seed database |
| `mongosh` | Connect to MongoDB |
| `curl URL` | Test API endpoint |
| `Ctrl+C` | Stop server |
| `node --version` | Check Node version |

---

## 🎟️ SHORTCUTS

- **F12**: Open DevTools (inspect, console, network)
- **Ctrl+R**: Hard refresh browser
- **Ctrl+Shift+R**: Force reload (clear cache)
- **Ctrl+J**: Open DevTools console
- **Ctrl+Shift+I**: Inspect element
- **Ctrl+C**: Stop terminal process
- **Ctrl+L**: Clear terminal

---

## ⚡ PRO TIPS

1. Use multiple terminals (one for backend, one for frontend)
2. Keep DevTools open for debugging
3. Check browser console for frontend errors
4. Check terminal for backend errors
5. Use `nodemon` for auto-reload (npm run dev)
6. Test OTP from backend console output
7. Use MongoDB GUI tool like Compass for data management
8. Use VSCode for best development experience

---

## 🎓 REMEMBER

- Backend runs on **port 5000**
- Frontend runs on **port 3000**
- MongoDB runs on **port 27017**
- OTP appears in **backend console**
- Tokens stored in **localStorage**
- Sample products seeded via **seedProducts.js**

---

## ✅ CHECKLIST

Before you start each day:
- [ ] Backend running on 5000
- [ ] Frontend running on 3000
- [ ] MongoDB is running
- [ ] Browser at http://localhost:3000
- [ ] DevTools open for debugging

---

**Save this file in your project folder for quick reference!**

Happy Coding! 🚀
