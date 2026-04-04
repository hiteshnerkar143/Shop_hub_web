import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const features = [
    {
      icon: "🛍️",
      title: "Wide Selection",
      description: "Browse from 500+ products across Electronics, Clothing, Books, Home & Sports"
    },
    {
      icon: "🔒",
      title: "Secure Checkout",
      description: "OTP-based authentication ensures your account is always secure and protected"
    },
    {
      icon: "🚀",
      title: "Fast Delivery",
      description: "Quick checkout process and multiple payment options for your convenience"
    },
    {
      icon: "⭐",
      title: "Best Prices",
      description: "Competitive pricing and regular discounts on your favorite items"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-subtitle">Welcome to eStore</span>
          <h1>Your Ultimate Shopping Experience Awaits</h1>
          
          <div className="hero-tags">
            <span>Premium Products</span>
            <span>Secure Payment</span>
            <span>Fast Service</span>
          </div>

          <p className="hero-description">
            Discover our curated collection of 500+ premium products. Shop with confidence using our secure OTP-based authentication system. Browse, select, and checkout in minutes.
          </p>

          <div className="hero-cta">
            <button className="btn-cta btn-primary-cta" onClick={() => navigate("/products")}>
              🛒 Start Shopping
            </button>
            {!isLoggedIn && (
              <button className="btn-cta btn-secondary-cta" onClick={() => navigate("/signup")}>
                Create Account <span className="arrow-icon">→</span>
              </button>
            )}
          </div>
        </div>

        <div className="hero-illustration">
          <div style={{
            width: "100%",
            maxWidth: "450px",
            height: "450px",
            background: "linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(102, 126, 234, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "120px",
            backdropFilter: "blur(10px)"
          }}>
            🛍️
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-description">
              We provide the best shopping experience with premium products, secure transactions, and exceptional customer service
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Start Shopping?</h2>
        <p>Browse our exclusive collection and find exactly what you're looking for</p>
        <button className="btn-cta btn-primary-cta" onClick={() => navigate("/products")}>
          🎯 Explore Products
        </button>
      </section>
    </div>
  );
};

export default Home;
