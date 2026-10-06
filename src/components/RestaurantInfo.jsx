import React from "react";

/*
  Modification 4:
  React Class Component

  This component intentionally uses the traditional
  React.Component class syntax to satisfy the
  class-component requirement of the CIE-2 project.
*/

class RestaurantInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantName: "Pedro's Pizzeria",
      openingHours: "11:00 AM - 11:00 PM",
      deliveryTime: "25 - 35 minutes",
    };
  }

  render() {
    const {
      restaurantName,
      openingHours,
      deliveryTime,
    } = this.state;

    return (
      <section
        style={{
          width: "90%",
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "30px",
          background: "#121619",
          color: "white",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            marginBottom: "15px",
            color: "#ff9f1c",
          }}
        >
          {restaurantName}
        </h2>

        <p>
          Fresh pizzas, authentic ingredients and
          fast delivery.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <div>
            <strong>Opening Hours</strong>
            <br />
            <span>{openingHours}</span>
          </div>

          <div>
            <strong>Delivery Time</strong>
            <br />
            <span>{deliveryTime}</span>
          </div>
        </div>
      </section>
    );
  }
}

export default RestaurantInfo;