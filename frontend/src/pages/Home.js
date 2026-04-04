import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopHub</h1>
          <p>Discover the best products at unbeatable prices</p>
          <button
            className="btn btn-primary btn-hero"
            onClick={() => navigate("/products")}
          >
            Shop Now 🛍️
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Shipping</h3>
              <p>Quick and secure delivery to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Payment</h3>
              <p>Safe and encrypted transaction processing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Quality Products</h3>
              <p>Curated selection of premium items</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Customer Support</h3>
              <p>24/7 assistance for all your queries</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Shop?</h2>
          <p>Join thousands of happy customers</p>
          {!isLoggedIn && (
            <div className="cta-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
