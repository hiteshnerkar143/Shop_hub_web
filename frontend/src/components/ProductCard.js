import { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product._id, quantity);
    setShowQuantitySelector(false);
    setQuantity(1);
  };

  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23e0e0e0' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3EImage not available%3C/text%3E%3C/svg%3E";

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={imageError ? fallbackImage : product.image} 
          alt={product.name}
          onError={() => setImageError(true)}
        />
        <div className="product-badge">{product.category}</div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-description">
          {product.description.substring(0, 60)}...
        </p>

        <div className="product-rating">
          <span className="stars">⭐ {product.rating}</span>
          <span className="reviews">({product.reviews} reviews)</span>
        </div>

        <div className="product-price">
          <span className="price">₹{product.price.toLocaleString()}</span>
          {product.stock > 0 ? (
            <span className="stock-info">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>

        {showQuantitySelector ? (
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              min="1"
              max={product.stock}
            />
            <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>
              +
            </button>
            <button
              className="btn btn-confirm"
              onClick={handleAddToCart}
            >
              Confirm
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary btn-add-to-cart"
            onClick={() => setShowQuantitySelector(true)}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
