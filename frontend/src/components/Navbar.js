import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setIsLoggedIn(!!token);
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/");
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={handleNavClick}>
          🛍️ ShopHub
        </Link>

        {/* Desktop Menu */}
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={handleNavClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={handleNavClick}>
              Products
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/cart" onClick={handleNavClick}>
                🛒 Cart
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login" onClick={handleNavClick}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={handleNavClick}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* User Info & Logout */}
        {isLoggedIn && (
          <div className={`navbar-user ${menuOpen ? "active" : ""}`}>
            <div className="navbar-user-info">
              <div className="navbar-user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="navbar-user-name">{user.name || "User"}</span>
            </div>
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {/* Hamburger Menu */}
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
