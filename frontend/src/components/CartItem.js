import { useState } from "react";
import "./CartItem.css";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.productId._id, newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdateQuantity(item.productId._id, newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < item.productId.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onUpdateQuantity(item.productId._id, newQuantity);
    }
  };

  const itemTotal = item.price * quantity;

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.productId.image} alt={item.productId.name} />
      </div>

      <div className="item-details">
        <h4>{item.productId.name}</h4>
        <p className="item-category">{item.productId.category}</p>
        <p className="item-description">
          {item.productId.description.substring(0, 60)}...
        </p>
      </div>

      <div className="item-quantity">
        <button onClick={handleDecrement}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          max={item.productId.stock}
        />
        <button onClick={handleIncrement}>+</button>
      </div>

      <div className="item-price">
        <p className="price-per-item">₹{item.price.toLocaleString()}</p>
        <p className="price-total">₹{itemTotal.toLocaleString()}</p>
      </div>

      <button className="btn-remove" onClick={() => onRemove(item.productId._id)}>
        ✕
      </button>
    </div>
  );
};

export default CartItem;
