import React, { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

import "../styles/Cart.css";

function CartModal() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalCount,
    showToast,
  } = useCart();

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  /*
    Customer information
  */

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  /*
    Form validation errors
  */

  const [errors, setErrors] = useState({});

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) {
    return null;
  }

  /*
    Promo code
  */

  const handleApplyPromo = (e) => {
    e.preventDefault();

    if (promoCode.trim().toUpperCase() === "PEDRO10") {
      setDiscount(0.1);
      setPromoError("");

      showToast("10% discount applied successfully! 🎉");
    } else {
      setDiscount(0);

      setPromoError(
        "Invalid code. Try 'PEDRO10' for 10% off!"
      );
    }
  };

  /*
    Customer input handler
  */

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));

    /*
      Remove error while user is typing.
    */

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /*
    Modification 5:
    Form validation
  */

  const validateForm = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = "Please enter your full name.";
    } else if (customer.name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    }

    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;

    if (!customer.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!phoneRegex.test(customer.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!customer.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(customer.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!customer.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    } else if (customer.address.trim().length < 10) {
      newErrors.address =
        "Please enter a complete delivery address.";
    }

    /*
      Order details validation
    */

    if (cartItems.length === 0) {
      newErrors.items =
        "Please add at least one pizza to your order.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
    Calculate bill
  */

  const deliveryFee =
    subtotal > 35 || subtotal === 0 ? 0 : 3.99;

  const tax = subtotal * 0.08;

  const discountedSubtotal =
    subtotal * (1 - discount);

  const grandTotal =
    discountedSubtotal + tax + deliveryFee;

  /*
    Modification 3:
    Submit order to Express API
  */

  const handleCheckout = async () => {
    if (!validateForm()) {
      showToast("Please correct the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customer: {
            name: customer.name.trim(),
            phone: customer.phone.trim(),
            email: customer.email.trim(),
            address: customer.address.trim(),
          },

          items: cartItems,

          subtotal: Number(discountedSubtotal.toFixed(2)),

          tax: Number(tax.toFixed(2)),

          deliveryFee: Number(deliveryFee.toFixed(2)),

          total: Number(grandTotal.toFixed(2)),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to place order."
        );
      }

      /*
        Successful order
      */

      setOrderId(data.order.id);

      setIsOrdered(true);

      clearCart();

      showToast(
        "🍕 Order successfully placed!"
      );
    } catch (error) {
      console.error("Order error:", error);

      showToast(
        "Unable to place order. Make sure the Express server is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
    Reset cart modal
  */

  const closeOrderSuccess = () => {
    setIsOrdered(false);
    setOrderId("");

    setCustomer({
      name: "",
      phone: "",
      email: "",
      address: "",
    });

    setErrors({});

    setIsCartOpen(false);
  };

  return (
    <div
      className="cartOverlay"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="cartDrawer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="cartHeader">
          <div className="cartHeaderTitle">
            <ShoppingBag size={24} />

            <h2>Your Order</h2>

            <span className="cartItemCount">
              ({totalCount} items)
            </span>
          </div>

          <button
            className="closeCartBtn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* ORDER SUCCESS */}

        {isOrdered ? (
          <div className="orderSuccessState">
            <CheckCircle
              size={64}
              color="#2ec4b6"
            />

            <h3>Order Confirmed!</h3>

            <p>
              Thank you, {customer.name}!
            </p>

            <p className="orderSubtext">
              Your pizza is being prepared.
            </p>

            <div className="orderIdBox">
              <span>Order ID</span>

              <strong>{orderId}</strong>
            </div>

            <p className="orderSubtext">
              Estimated delivery time:
              <strong> 25 - 35 mins</strong>
            </p>

            <button
              className="checkoutBtn"
              onClick={closeOrderSuccess}
            >
              Done
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* EMPTY CART */

          <div className="emptyCartState">
            <div className="emptyCartIcon">
              🍕
            </div>

            <h3>Your cart is empty</h3>

            <p>
              Looks like you haven't added any
              cheesy goodness yet.
            </p>

            <Link
              to="/menu"
              className="exploreMenuBtn"
              onClick={() =>
                setIsCartOpen(false)
              }
            >
              Explore Menu
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}

            <div className="cartItemsList">
              {cartItems.map((item) => (
                <div
                  key={item.name}
                  className="cartItemRow"
                >
                  <div
                    className="cartItemThumb"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />

                  <div className="cartItemDetails">
                    <h4>{item.name}</h4>

                    <p className="cartItemPrice">
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                    <div className="cartQtyControls">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.name,
                            -1
                          )
                        }
                      >
                        <Minus size={14} />
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.name,
                            1
                          )
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    className="cartRemoveBtn"
                    onClick={() =>
                      removeFromCart(item.name)
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* ORDER FORM */}

            <div className="orderFormSection">
              <h3>Delivery Details</h3>

              <div className="formField">
                <label htmlFor="customer-name">
                  Full Name *
                </label>

                <input
                  id="customer-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                />

                {errors.name && (
                  <span className="formError">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="formField">
                <label htmlFor="customer-phone">
                  Phone Number *
                </label>

                <input
                  id="customer-phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                />

                {errors.phone && (
                  <span className="formError">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="formField">
                <label htmlFor="customer-email">
                  Email *
                </label>

                <input
                  id="customer-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={customer.email}
                  onChange={handleCustomerChange}
                />

                {errors.email && (
                  <span className="formError">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="formField">
                <label htmlFor="customer-address">
                  Delivery Address *
                </label>

                <textarea
                  id="customer-address"
                  name="address"
                  rows="3"
                  placeholder="Enter complete delivery address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                />

                {errors.address && (
                  <span className="formError">
                    {errors.address}
                  </span>
                )}
              </div>

              {errors.items && (
                <span className="formError">
                  {errors.items}
                </span>
              )}
            </div>

            {/* PROMO */}

            <div className="cartFooter">
              <form
                onSubmit={handleApplyPromo}
                className="promoForm"
              >
                <input
                  type="text"
                  placeholder="Promo Code (PEDRO10)"
                  value={promoCode}
                  onChange={(e) =>
                    setPromoCode(e.target.value)
                  }
                />

                <button type="submit">
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="promoError">
                  {promoError}
                </p>
              )}

              {discount > 0 && (
                <p className="promoSuccess">
                  10% discount applied!
                </p>
              )}

              {/* SUMMARY */}

              <div className="cartSummary">
                <div className="summaryRow">
                  <span>Subtotal</span>

                  <span>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="summaryRow discountRow">
                    <span>
                      Discount (10%)
                    </span>

                    <span>
                      -$
                      {(
                        subtotal * discount
                      ).toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="summaryRow">
                  <span>
                    Est. Tax (8%)
                  </span>

                  <span>
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="summaryRow">
                  <span>Delivery</span>

                  <span>
                    {deliveryFee === 0 ? (
                      <strong
                        style={{
                          color: "#2ec4b6",
                        }}
                      >
                        FREE
                      </strong>
                    ) : (
                      `$${deliveryFee.toFixed(
                        2
                      )}`
                    )}
                  </span>
                </div>

                <div className="summaryRow totalRow">
                  <span>Total</span>

                  <span>
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* CHECKOUT */}

              <button
                className="checkoutBtn"
                onClick={handleCheckout}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Placing Order..."
                  : `Place Order ($${grandTotal.toFixed(
                      2
                    )})`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;