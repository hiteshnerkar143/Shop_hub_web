import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import VerifySignupOTP from "./pages/VerifySignupOTP";
import Login from "./pages/Login";
import VerifyLoginOTP from "./pages/VerifyLoginOTP";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Styles
import "./styles/globals.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-signup" element={<VerifySignupOTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-login" element={<VerifyLoginOTP />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route
          path="/checkout"
          element={<ProtectedRoute element={<Checkout />} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
