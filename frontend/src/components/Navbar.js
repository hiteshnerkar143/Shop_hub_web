import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ ShopHub
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/cart" className="nav-link">
                🛒 Cart
              </Link>
              <div className="nav-user">
                <span className="user-name">{user.name || "User"}</span>
                <button onClick={handleLogout} className="btn btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-nav-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-nav-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar-mobile">
          <Link to="/" className="nav-link-mobile">
            Home
          </Link>
          <Link to="/products" className="nav-link-mobile">
            Products
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="nav-link-mobile">
                Cart
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-primary nav-link-mobile"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary nav-link-mobile">
                Login
              </Link>
              <Link to="/signup" className="btn btn-secondary nav-link-mobile">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
