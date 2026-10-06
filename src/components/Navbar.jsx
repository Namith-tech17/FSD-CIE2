import React, { useState } from "react";
import Logo from "../assets/pizzaLogo.png";
import { Link, useLocation } from "react-router-dom";
import { Menu as ReorderIcon, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const closeMobileMenu = () => {
    setOpenLinks(false);
  };

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/" onClick={closeMobileMenu}>
          <img src={Logo} alt="Pedro's Pizzeria Logo" />
        </Link>
        <div className="hiddenLinks">
          <Link to="/" className={isActive("/")} onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/menu" className={isActive("/menu")} onClick={closeMobileMenu}>
            Menu
          </Link>
          <Link to="/about" className={isActive("/about")} onClick={closeMobileMenu}>
            About
          </Link>
          <Link to="/contact" className={isActive("/contact")} onClick={closeMobileMenu}>
            Contact
          </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>
        <Link to="/menu" className={isActive("/menu")}>
          Menu
        </Link>
        <Link to="/about" className={isActive("/about")}>
          About
        </Link>
        <Link to="/contact" className={isActive("/contact")}>
          Contact
        </Link>

        {/* Personalized feature: Cart Drawer Button */}
        <button
          className="cart-nav-btn"
          onClick={() => setIsCartOpen(true)}
          title="View Order"
          aria-label="View Order"
        >
          <ShoppingBag size={24} />
          {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
        </button>

        {/* Tutorial mobile toggle button */}
        <button className="menu-toggle-btn" onClick={toggleNavbar} aria-label="Toggle navigation">
          {openLinks ? <X size={32} /> : <ReorderIcon size={32} />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
