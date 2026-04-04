import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartAPI } from "../services/api";
import CartItem from "../components/CartItem";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [navigate]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCart(response.data.cart);
    } catch (err) {
      setError("Failed to fetch cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const response = await cartAPI.updateCartItem({
        productId,
        quantity,
      });
      setCart(response.data.cart);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update cart");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await cartAPI.removeFromCart({ productId });
      setCart(response.data.cart);
      setSuccess("Item removed from cart");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove item");
    }
  };

  const handleCheckout = () => {
    if (cart && cart.items.length > 0) {
      navigate("/checkout", { state: { cart } });
    }
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>
          {cart?.items.length || 0} item{cart?.items.length !== 1 ? "s" : ""}
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {!cart || cart.items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Start shopping and add items to your cart!</p>
          <button
            className="btn btn-primary"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-wrapper">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.items.map((item) => (
              <CartItem
                key={item.productId._id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{cart.totalPrice.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Shipping:</span>
                <span className="free">FREE</span>
              </div>

              <div className="summary-row">
                <span>Tax (5%):</span>
                <span>₹{Math.round(cart.totalPrice * 0.05).toLocaleString()}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total:</span>
                <span>
                  ₹
                  {Math.round(cart.totalPrice * 1.05).toLocaleString()}
                </span>
              </div>

              <button
                className="btn btn-primary btn-full"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <button
                className="btn btn-secondary btn-full"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>

            {/* Discount Banner */}
            <div className="promo-card">
              <h4>💎 Promo Code</h4>
              <p>Have a promo code? Apply it during checkout!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
