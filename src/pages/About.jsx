import React from "react";

import MultiplePizzas from "../assets/multiplePizzas.jpeg";
import MakingPizza from "../assets/makingpizza.jpeg";

import {
  Star,
} from "lucide-react";

import RestaurantInfo from "../components/RestaurantInfo";

import "../styles/About.css";

function About() {
  const testimonials = [
    {
      name: "Marcus Sterling",
      review:
        "The PedroTech Special is unreal! The catupiry cheese brings an authenticity you won't find anywhere else in town.",
      rating: 5,
      city: "New York, NY",
    },

    {
      name: "Elena Rostova",
      review:
        "Crispiest crust, freshest basil, and lightning-fast delivery. Easily the best Margherita in the city.",
      rating: 5,
      city: "Austin, TX",
    },

    {
      name: "David Chen",
      review:
        "Family pizza night is never complete without Pedro's Pepperoni. High quality ingredients you can taste in every bite.",
      rating: 5,
      city: "Chicago, IL",
    },
  ];

  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{
          backgroundImage: `url(${MultiplePizzas})`,
        }}
      ></div>

      <div className="aboutBottom">
        <h1>ABOUT US</h1>

        <p>
          Founded with a passion for authentic Italian
          culinary heritage and a touch of Brazilian
          innovation, Pedro's Pizzeria has been crafting
          unforgettable dining experiences since 2012.
          Our journey started in a small brick oven
          kitchen with a single promise: never
          compromise on quality, freshness, or heart.
        </p>

        <p>
          Every pizza starts with our signature 48-hour
          cold-fermented dough made from imported Italian
          Tipo 00 flour, hand-stretched daily and topped
          with sweet San Marzano plum tomatoes, fragrant
          fresh-picked basil, and creamery whole-milk
          mozzarella.
        </p>

        <div className="aboutStatsGrid">
          <div className="statItem">
            <span className="statNumber">14+</span>
            <span className="statLabel">
              Years of Tradition
            </span>
          </div>

          <div className="statItem">
            <span className="statNumber">650K+</span>
            <span className="statLabel">
              Pizzas Baked
            </span>
          </div>

          <div className="statItem">
            <span className="statNumber">4.9★</span>
            <span className="statLabel">
              Customer Rating
            </span>
          </div>

          <div className="statItem">
            <span className="statNumber">100%</span>
            <span className="statLabel">
              Natural Ingredients
            </span>
          </div>
        </div>

        <div className="chefHighlightCard">
          <div
            className="chefImage"
            style={{
              backgroundImage: `url(${MakingPizza})`,
            }}
          />

          <div className="chefBio">
            <h3>
              Master Pizzaiolo Philosophy
            </h3>

            <p>
              "Pizza is not just food; it is a
              celebration that brings families and
              friends together around one table. When
              you take that first hot, melty bite, you
              should taste the warmth and passion we
              pour into the oven every single day."
            </p>

            <span className="chefSignature">
              — Master Chef Pedro & Team
            </span>
          </div>
        </div>

        {/* =================================================
            CLASS COMPONENT
            ================================================= */}

        <RestaurantInfo />

        {/* TESTIMONIALS */}

        <div className="testimonialsSection">
          <h2>
            What Our Community Says
          </h2>

          <div className="testimonialsGrid">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonialCard"
              >
                <div className="testimonialStars">
                  {[
                    ...Array(testimonial.rating),
                  ].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="#ffb703"
                      color="#ffb703"
                    />
                  ))}
                </div>

                <p className="testimonialText">
                  "{testimonial.review}"
                </p>

                <div className="testimonialAuthor">
                  <strong>
                    {testimonial.name}
                  </strong>

                  <span>
                    {testimonial.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;