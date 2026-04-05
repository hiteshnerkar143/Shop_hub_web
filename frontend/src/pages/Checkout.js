import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { paymentAPI } from "../services/api";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!cart || cart.items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.zipCode
      ) {
        setError("Please fill all fields");
        setLoading(false);
        return;
      }

      // Process fake payment
      const response = await paymentAPI.processPayment({
        items: cart.items,
        totalPrice: totalAmount / 1.05,
        shippingInfo: formData,
      });

      if (response.data.success) {
        alert(
          "✅ Payment Successful!\n\n💳 Order Placed Successfully!\n\nOrder ID: #" +
            response.data.orderId
        );
        navigate("/");
        localStorage.removeItem("cart");
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = Math.round(cart.totalPrice * 1.05);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Complete Your Purchase</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="checkout-wrapper">
        {/* Checkout Form */}
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Shipping Information</legend>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Payment Method</legend>

              <div className="payment-info">
                <p>💳 Demo Mode - Fake Payment System</p>
                <p>This is a demonstration. No real charges will be made.</p>
              </div>
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-checkout"
              disabled={loading}
            >
              {loading ? "Processing..." : "Complete Purchase"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cart.items.map((item) => (
                <div key={item.productId._id} className="summary-item">
                  <img src={item.productId.image} alt={item.productId.name} />
                  <div className="item-info">
                    <p className="item-name">{item.productId.name}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-rows">
              <div className="row">
                <span>Subtotal:</span>
                <span>₹{cart.totalPrice.toLocaleString()}</span>
              </div>
              <div className="row">
                <span>Shipping:</span>
                <span className="free">FREE</span>
              </div>
              <div className="row">
                <span>Tax (5%):</span>
                <span>₹{Math.round(cart.totalPrice * 0.05).toLocaleString()}</span>
              </div>
              <div className="row total">
                <span>Total Amount:</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              className="btn btn-secondary btn-full"
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
