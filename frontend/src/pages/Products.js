import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productAPI, cartAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Books",
    "Home",
    "Sports",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts();
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (selectedCategory, searchQuery, sortOption) => {
    let filtered = products;

    if (selectedCategory !== "All" && selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    handleFilter(cat, search, sort);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    handleFilter(category, query, sort);
  };

  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    setSort(sortOption);
    handleFilter(category, search, sortOption);
  };

  const handleAddToCart = async (productId, quantity) => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      await cartAPI.addToCart({ productId, quantity });
      setSuccess("Product added to cart!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add to cart");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover our amazing collection</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="products-wrapper">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h3>Filters</h3>

          {/* Search */}
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Category */}
          <div className="filter-group">
            <label>Category</label>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${
                  category === (cat === "All" ? "" : cat) ? "active" : ""
                }`}
                onClick={() =>
                  handleCategoryChange(cat === "All" ? "" : cat)
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={sort}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="products-main">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products found</p>
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
            <>
              <div className="products-count">
                Showing {filteredProducts.length} products
              </div>
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
