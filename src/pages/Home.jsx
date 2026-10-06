import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/pizza.jpeg";
import { Flame, Clock, Award, ShieldCheck } from "lucide-react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="homePageWrapper">
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="headerContainer">
          <h1> Pedro's Pizzeria </h1>
          <p> PIZZA TO FIT ANY TASTE</p>
          <Link to="/menu">
            <button> ORDER NOW </button>
          </Link>
        </div>
      </div>

      {/* Personalized feature: Highlights / Features Section */}
      <section className="featuresSection">
        <div className="featureCard">
          <div className="featureIconWrapper">
            <Flame size={32} color="#e71d36" />
          </div>
          <h3>Wood-Fired Oven</h3>
          <p>Baked to blistered perfection at 800°F using seasoned hickory wood.</p>
        </div>

        <div className="featureCard">
          <div className="featureIconWrapper">
            <Award size={32} color="#ff9f1c" />
          </div>
          <h3>Fresh Artisanal Dough</h3>
          <p>48-hour slow-fermented organic dough crafted fresh every single morning.</p>
        </div>

        <div className="featureCard">
          <div className="featureIconWrapper">
            <Clock size={32} color="#2ec4b6" />
          </div>
          <h3>30-Min Fast Delivery</h3>
          <p>Hot, crispy pizza delivered straight from our kitchen to your doorstep.</p>
        </div>

        <div className="featureCard">
          <div className="featureIconWrapper">
            <ShieldCheck size={32} color="#011627" />
          </div>
          <h3>100% Quality Guaranteed</h3>
          <p>Finest Italian San Marzano tomatoes and authentic whole-milk mozzarella.</p>
        </div>
      </section>

      {/* Personalized feature: Today's Special Banner */}
      <section className="dealBanner">
        <div className="dealContent">
          <span className="dealBadge">SPECIAL OFFER</span>
          <h2>Hungry for Something Unique?</h2>
          <p>Try the legendary PedroTech Special Pizza — catupiry cheese & seasoned chicken.</p>
          <Link to="/menu" className="dealBtn">
            Explore Menu
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
