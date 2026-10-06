import React from "react";
import { Instagram, Twitter, Facebook, Linkedin, Heart } from "lucide-react";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram size={28} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
          <Twitter size={28} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          <Facebook size={28} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin size={28} />
        </a>
      </div>
      <p className="footer-tagline">
        Crafted with <Heart size={14} className="heart-icon" /> for pizza lovers everywhere
      </p>
      <p> &copy; 2026 pedrotechpizza.com | All Rights Reserved</p>
    </div>
  );
}

export default Footer;
