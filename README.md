# 🍕 Pedro's Pizzeria - Full React.js Website

A fully responsive, multi-page restaurant web application built with **React.js**, **React Router DOM**, and modular CSS styling, based on the popular tutorial by **PedroTech** on YouTube, featuring enhanced interactive additions (Shopping Cart, Dynamic Search & Category Filtering, and Controlled Contact Forms).

---

## 📋 1. Project Approval & Tutorial Details

* **Selected Tutorial:** *React Website Tutorial - Beginner React JS Project Fully Responsive*
* **YouTube Channel:** [PedroTech](https://www.youtube.com/@PedroTechnologies)
* **Reference Repository:** [machadop1407/react-website-tutorial](https://github.com/machadop1407/react-website-tutorial)
* **Application Domain:** Food & Beverage / Restaurant Website (*Pedro's Pizzeria*)
* **Complexity Level:** Intermediate Mini-Project covering client-side routing, responsive mobile drawer, dynamic list rendering, state-driven UI updates, and props passing.

---

## 🚀 2. Core React Concepts Demonstrated

| React Concept | Implementation Details in This Project |
| :--- | :--- |
| **Functional Components & JSX** | Decomposed modular components (`Navbar`, `Footer`, `MenuItem`, `CartModal`) and pages (`Home`, `Menu`, `About`, `Contact`). |
| **React State (`useState`)** | Managed mobile menu toggle (`openLinks`), cart item counts & quantities, active search filters, category selection, and form inputs. |
| **Props & Destructuring** | Transferred pizza details (`image`, `name`, `price`, `description`, `category`, `rating`) to reusable `MenuItem` instances. |
| **Client-Side Routing (`react-router-dom`)** | Configured multi-page SPA navigation (`/`, `/menu`, `/about`, `/contact`) without page reloads. |
| **Dynamic List Rendering (`.map()`)** | Mapped over `MenuList` data array with unique keys and dynamic UI generation. |
| **Controlled Components & Forms** | Controlled inputs for Name, Email, and Message with real-time validation and submission state handling. |
| **Global State Context (`useContext`)** | Centralized `CartContext` providing persistent cart state, quantity adjustment, subtotal calculations, and notifications across pages. |
| **Responsive Design & Media Queries** | Responsive navigation bar with mobile hamburger drawer, flexible grid layout (`3-col` → `2-col` → `1-col`), and mobile-optimized forms. |

---

## ✨ 3. Personalization & Feature Enhancements

Beyond the original tutorial, this project adds several practical features:
1. **Interactive Cart & Ordering Drawer:**
   * "Add to Order" button directly on each pizza card.
   * Slide-out cart drawer showing order summary, quantity increment/decrement, and subtotal calculation.
   * Interactive promo discount code (`PEDRO10` for 10% off).
   * Animated order confirmation state and toast notifications.
2. **Search Bar & Category Filters:**
   * Real-time search by pizza name or ingredients.
   * Quick filter tabs (*All*, *Classic*, *Vegetarian*, *Special*, *Premium*).
   * Sort dropdown (*Price: Low to High*, *Price: High to Low*, *Highest Rated*).
3. **Interactive Controlled Contact Form:**
   * Controlled React state with validation.
   * Feedback box with animated confirmation and "Send Another Message" flow.
   * Direct contact cards for Location, Phone Orders, Hours, and Email.
4. **Enhanced About Us & Testimonials:**
   * Behind-the-scenes bakery story and master chef spotlight.
   * Numerical milestones counter (14+ Years, 650K+ Pizzas, 4.9★).
   * Community customer reviews grid.

---

## 📁 4. Project Directory Structure

```text
d:/FSD_CIE2/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.jsx
    ├── assets/
    │   ├── expensive.jpg
    │   ├── makingpizza.jpeg
    │   ├── margherita.jpg
    │   ├── multiplePizzas.jpeg
    │   ├── pedrotechspecial.jpg
    │   ├── pepperoni.jpg
    │   ├── pineapple.jpg
    │   ├── pizza.jpeg
    │   ├── pizzaLeft.jpg
    │   ├── pizzaLogo.png
    │   └── vegan.jpg
    ├── components/
    │   ├── CartModal.jsx
    │   ├── Footer.jsx
    │   ├── MenuItem.jsx
    │   └── Navbar.jsx
    ├── context/
    │   └── CartContext.jsx
    ├── helpers/
    │   └── MenuList.js
    ├── pages/
    │   ├── About.jsx
    │   ├── Contact.jsx
    │   ├── Home.jsx
    │   └── Menu.jsx
    └── styles/
        ├── About.css
        ├── Cart.css
        ├── Contact.css
        ├── Footer.css
        ├── Home.css
        ├── Menu.css
        └── Navbar.css
```

---

## 🛠️ 5. Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open in your browser
http://localhost:3000/
```
