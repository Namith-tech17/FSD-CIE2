import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CartModal from "./components/CartModal";
import { CartProvider, useCart } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function ToastNotification() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;
  return <div className="globalToast">{toastMessage}</div>;
}

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
          <CartModal />
          <ToastNotification />
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
