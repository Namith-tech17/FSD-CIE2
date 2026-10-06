import React from "react";
import { Plus, Star, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

function MenuItem({ image, name, price, description, category, rating, isVeg }) {
  const { addToCart, cartItems } = useCart();
  const cartItem = cartItems.find((i) => i.name === name);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="menuItem">
      <div className="menuItemImage" style={{ backgroundImage: `url(${image})` }}>
        {category && <span className="categoryBadge">{category}</span>}
        {isVeg && <span className="vegBadge" title="100% Vegetarian">🌱 Veg</span>}
      </div>
      <div className="menuItemInfo">
        <div className="menuItemHeader">
          <h1>{name}</h1>
          {rating && (
            <span className="ratingBadge">
              <Star size={14} fill="#ffb703" color="#ffb703" /> {rating}
            </span>
          )}
        </div>
        {description && <p className="menuItemDesc">{description}</p>}
        <div className="menuItemBottom">
          <p className="menuItemPrice">${typeof price === "number" ? price.toFixed(2) : price}</p>
          <button
            className="orderItemBtn"
            onClick={() => addToCart({ name, price, image, description })}
          >
            {inCartQty > 0 ? (
              <>
                <Check size={16} /> Added ({inCartQty})
              </>
            ) : (
              <>
                <Plus size={16} /> Add to Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
