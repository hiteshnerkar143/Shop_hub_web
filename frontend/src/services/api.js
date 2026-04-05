import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Add token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  signup: (data) => API.post("/auth/signup", data),
  verifySignupOTP: (data) => API.post("/auth/verify-signup", data),
  login: (data) => API.post("/auth/login", data),
  verifyLoginOTP: (data) => API.post("/auth/verify-login", data),
  resendOTP: (data) => API.post("/auth/resend-otp", data),
};

// Product APIs
export const productAPI = {
  getProducts: (params) => API.get("/products", { params }),
  getProductById: (id) => API.get(`/products/${id}`),
  createProduct: (data) => API.post("/products", data),
  updateProduct: (id, data) => API.put(`/products/${id}`, data),
  deleteProduct: (id) => API.delete(`/products/${id}`),
};

// Cart APIs
export const cartAPI = {
  getCart: () => API.get("/cart"),
  addToCart: (data) => API.post("/cart/add", data),
  removeFromCart: (data) => API.post("/cart/remove", data),
  updateCartItem: (data) => API.post("/cart/update", data),
  clearCart: () => API.post("/cart/clear"),
};

// Payment APIs (Demo/Fake)
export const paymentAPI = {
  processPayment: (data) => API.post("/payment/process-payment", data),
};

export default API;
