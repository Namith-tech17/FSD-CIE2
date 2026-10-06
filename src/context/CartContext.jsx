import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /*
    Modification 2:
    Load cart from localStorage when application starts.
  */

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(
        "pedro_pizzeria_cart"
      );

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error(
        "Unable to load cart:",
        error
      );

      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState(null);

  /*
    Save cart whenever cartItems changes.
  */

  useEffect(() => {
    localStorage.setItem(
      "pedro_pizzeria_cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  /*
    Toast notification
  */

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  /*
    Add item to cart
  */

  const addToCart = (item) => {
    setCartItems((previousItems) => {
      const existingItem =
        previousItems.find(
          (cartItem) =>
            cartItem.name === item.name
        );

      if (existingItem) {
        return previousItems.map(
          (cartItem) =>
            cartItem.name === item.name
              ? {
                  ...cartItem,
                  quantity:
                    cartItem.quantity + 1,
                }
              : cartItem
        );
      }

      return [
        ...previousItems,
        {
          ...item,
          quantity: 1,
        },
      ];
    });

    showToast(
      `Added ${item.name} to your order! 🍕`
    );
  };

  /*
    Remove item
  */

  const removeFromCart = (name) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.name !== name
      )
    );
  };

  /*
    Change quantity
  */

  const updateQuantity = (name, delta) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) => {
          if (item.name === name) {
            const newQuantity =
              item.quantity + delta;

            return newQuantity > 0
              ? {
                  ...item,
                  quantity: newQuantity,
                }
              : null;
          }

          return item;
        })
        .filter(Boolean)
    );
  };

  /*
    Empty cart
  */

  const clearCart = () => {
    setCartItems([]);
  };

  /*
    Total number of items
  */

  const totalCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  /*
    Cart subtotal
  */

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        removeFromCart,

        updateQuantity,

        clearCart,

        isCartOpen,

        setIsCartOpen,

        totalCount,

        subtotal,

        toastMessage,

        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);