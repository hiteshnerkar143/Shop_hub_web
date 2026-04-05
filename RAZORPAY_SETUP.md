# 🔐 Razorpay Payment Integration Setup Guide

## Step 1: Install Razorpay Package

In your **backend** folder, run:
```bash
cd backend
npm install razorpay
```

## Step 2: Get Razorpay API Keys

1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a free account
3. Go to **Settings → API Keys**
4. Copy your:
   - **Key ID** (starts with `rzp_live_` or `rzp_test_`)
   - **Key Secret**

## Step 3: Add to .env File

Create or update your `.env` file in the **backend** folder:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret
```

## Step 4: Restart Backend Server

```bash
npm run dev
```

## Step 5: Test Payment in Frontend

### Test Cards (Use in Development):

**Success Payment:**
- Card: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

**Failed Payment:**
- Card: `4000 0000 0000 0002`
- Expiry: Any future date
- CVV: Any 3 digits

## How It Works:

1. ✅ Customer fills shipping details on Checkout page
2. ✅ Clicks "Proceed to Payment"
3. ✅ Razorpay payment modal opens
4. ✅ Customer enters card details (securely handled by Razorpay)
5. ✅ Payment is verified on your backend
6. ✅ Order is created & cart is cleared
7. ✅ Success message displayed

## Features Implemented:

✅ **Secure Payment Processing** - PCI DSS compliant
✅ **Payment Verification** - Signature verification
✅ **Order Management** - Automatic order creation
✅ **Stock Management** - Auto-update product stock
✅ **Cart Clearing** - Auto-clear cart after payment
✅ **Order History** - Users can view all orders

## API Endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/payment/create-order` | POST | Create Razorpay order |
| `/api/payment/verify-payment` | POST | Verify payment & complete order |
| `/api/payment/order/:orderId` | GET | Get specific order details |
| `/api/payment/orders` | GET | Get user's all orders |

## Environment Variables Reference:

```
RAZORPAY_KEY_ID    = Your public key from Razorpay
RAZORPAY_KEY_SECRET = Your secret key from Razorpay (KEEP SECURE!)
```

## Security Notes:

🔒 Never expose `RAZORPAY_KEY_SECRET` in frontend code
🔒 Always verify payment signatures on backend
🔒 Card details are never stored - handled by Razorpay
🔒 Uses HTTPS for all payment communications

## Troubleshooting:

**Payment modal not opening?**
- Check if Razorpay script loaded: Open DevTools → Network tab
- Verify RAZORPAY_KEY_ID is correct

**"Verification failed" error?**
- Check RAZORPAY_KEY_SECRET in .env
- Verify signature calculation in backend

**Orders not creating?**
- Check MongoDB connection
- Verify Order model is imported in paymentController

## Next Steps:

1. Test with test cards above
2. Verify orders in MongoDB
3. When ready for production: Change test keys to live keys in Razorpay dashboard
4. Update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env

Questions? Check [Razorpay Docs](https://razorpay.com/docs)
