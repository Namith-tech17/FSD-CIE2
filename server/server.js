import express from "express";

const app = express();

const PORT = 5000;

app.use(express.json());

/*
  MENU DATA
  This data is served through the Express API.
*/

const menu = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    price: 15.99,
    category: "Non-Vegetarian",
    originalCategory: "Classic",
    description:
      "Classic hand-tossed crust loaded with Italian pepperoni and premium mozzarella.",
    rating: 4.9,
    isVeg: false,
    imageName: "pepperoni.jpg",
  },

  {
    id: 2,
    name: "Margherita Pizza",
    price: 11.99,
    category: "Vegetarian",
    originalCategory: "Vegetarian",
    description:
      "Traditional Neapolitan pizza with San Marzano tomatoes, fresh basil, and buffalo mozzarella.",
    rating: 4.8,
    isVeg: true,
    imageName: "margherita.jpg",
  },

  {
    id: 3,
    name: "PedroTech Special Pizza",
    price: 256.53,
    category: "Special",
    originalCategory: "Special",
    description:
      "Our signature Brazilian chef special topped with seasoned chicken, catupiry cheese, and hearts of palm.",
    rating: 5.0,
    isVeg: false,
    imageName: "pedrotechspecial.jpg",
  },

  {
    id: 4,
    name: "Vegan Pizza",
    price: 17.99,
    category: "Vegetarian",
    originalCategory: "Vegetarian",
    description:
      "Crispy crust topped with garden veggies, sun-dried tomatoes, and organic plant-based mozzarella.",
    rating: 4.7,
    isVeg: true,
    imageName: "vegan.jpg",
  },

  {
    id: 5,
    name: "Pineapple Pizza",
    price: 4.99,
    category: "Non-Vegetarian",
    originalCategory: "Classic",
    description:
      "The sweet and savory Hawaiian favorite with caramelized pineapple chunks and smoked ham.",
    rating: 4.5,
    isVeg: false,
    imageName: "pineapple.jpg",
  },

  {
    id: 6,
    name: "Very Expensive Pizza",
    price: 1997.99,
    category: "Special",
    originalCategory: "Premium",
    description:
      "Luxury culinary masterpiece garnished with edible 24k gold leaf, black truffles, and Sevruga caviar.",
    rating: 5.0,
    isVeg: false,
    imageName: "expensive.jpg",
  },
];

/*
  Store orders in memory for demonstration.

  In a real application this would be a database.
*/

const orders = [];

/*
  GET /api/menu

  Returns all pizza menu items.
*/

app.get("/api/menu", (req, res) => {
  res.json({
    success: true,
    count: menu.length,
    menu,
  });
});

/*
  POST /api/orders

  Creates a new order.
*/

app.post("/api/orders", (req, res) => {
  const { customer, items, subtotal, tax, deliveryFee, total } = req.body;

  if (!customer) {
    return res.status(400).json({
      success: false,
      message: "Customer information is required.",
    });
  }

  if (
    !customer.name ||
    !customer.phone ||
    !customer.email ||
    !customer.address
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all customer details.",
    });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Your order must contain at least one pizza.",
    });
  }

  const order = {
    id: `PEDRO-${Date.now()}`,
    customer,
    items,
    subtotal,
    tax,
    deliveryFee,
    total,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  res.status(201).json({
    success: true,
    message: "Order created successfully.",
    order,
  });
});

/*
  GET /api/orders/:id

  Returns one order using its order ID.
*/

app.get("/api/orders/:id", (req, res) => {
  const order = orders.find((item) => item.id === req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found.",
    });
  }

  res.json({
    success: true,
    order,
  });
});

/*
  Health check endpoint
*/

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Pedro's Pizzeria API is running!",
  });
});

app.listen(PORT, () => {
  console.log(`🍕 Pedro's Pizzeria API running on http://localhost:${PORT}`);
});