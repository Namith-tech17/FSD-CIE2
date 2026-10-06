import React, { useState } from "react";
import PizzaLeft from "../assets/pizzaLeft.jpg";
import { Send, CheckCircle2, Phone, MapPin, Clock, Mail } from "lucide-react";
import { useCart } from "../context/CartContext";
import "../styles/Contact.css";

function Contact() {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(`Thank you, ${formData.name}! Your message has been sent. 🍕`);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="contactPageWrapper">
      <div className="contact">
        <div
          className="leftSide"
          style={{ backgroundImage: `url(${PizzaLeft})` }}
        ></div>
        <div className="rightSide">
          <h1> Contact Us</h1>

          {submitted ? (
            <div className="contactSuccessBox">
              <CheckCircle2 size={48} color="#2ec4b6" />
              <h3>Message Received!</h3>
              <p>
                Thanks for reaching out! Our team will get back to you within 24
                hours.
              </p>
              <button
                className="sendAnotherBtn"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                placeholder="Enter full name..."
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                placeholder="Enter email..."
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="6"
                placeholder="Enter message..."
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} style={{ marginRight: "6px" }} /> Send
                    Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Personalized feature: Direct Contact Information Cards */}
      <div className="contactInfoSection">
        <div className="contactInfoCard">
          <MapPin size={28} color="#e71d36" />
          <h4>Our Location</h4>
          <p>123 Pizza Boulevard, Little Italy, NY 10013</p>
        </div>
        <div className="contactInfoCard">
          <Phone size={28} color="#ff9f1c" />
          <h4>Phone Orders</h4>
          <p>+1 (800) 555-PIZZA</p>
        </div>
        <div className="contactInfoCard">
          <Clock size={28} color="#2ec4b6" />
          <h4>Opening Hours</h4>
          <p>Mon - Sun: 11:00 AM - 11:00 PM</p>
        </div>
        <div className="contactInfoCard">
          <Mail size={28} color="#011627" />
          <h4>Email Support</h4>
          <p>support@pedrotechpizza.com</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
