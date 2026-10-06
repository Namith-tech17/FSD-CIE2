import React, { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

import MenuItem from "../components/MenuItem";
import { MenuList as LocalMenuList } from "../helpers/MenuList";

import Pepperoni from "../assets/pepperoni.jpg";
import Margherita from "../assets/margherita.jpg";
import PedroTechSpecial from "../assets/pedrotechspecial.jpg";
import Vegan from "../assets/vegan.jpg";
import Pineapple from "../assets/pineapple.jpg";
import Expensive from "../assets/expensive.jpg";

import "../styles/Menu.css";

/*
  Images are stored locally in React.
  Menu information itself comes from the Express API.
*/

const imageMap = {
  "pepperoni.jpg": Pepperoni,
  "margherita.jpg": Margherita,
  "pedrotechspecial.jpg": PedroTechSpecial,
  "vegan.jpg": Vegan,
  "pineapple.jpg": Pineapple,
  "expensive.jpg": Expensive,
};

function Menu() {
  /*
    Modification 3:
    Fetch menu data from Express API using useEffect.
  */

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  /*
    Modification 1:
    Search and filter values stored using useState.
  */

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  /*
    Fetch menu from Express backend.
  */

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/menu");

        if (!response.ok) {
          throw new Error("Unable to fetch menu.");
        }

        const data = await response.json();

        const formattedMenu = data.menu.map((item) => ({
          ...item,
          image: imageMap[item.imageName],
        }));

        setMenuItems(formattedMenu);
        setApiError("");
      } catch (error) {
        console.error("Menu API Error:", error);

        /*
          Fallback to local menu if Express isn't running.
          This keeps the frontend usable.
        */

        setMenuItems(LocalMenuList);
        setApiError(
          "Backend unavailable. Showing local menu data instead."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  /*
    Modification 1:
    Dynamically filter and search pizzas.
  */

  const filteredPizzas = useMemo(() => {
    return menuItems
      .filter((item) => {
        const search = searchTerm.toLowerCase().trim();

        const matchesSearch =
          item.name.toLowerCase().includes(search) ||
          item.description?.toLowerCase().includes(search);

        const matchesCategory =
          selectedCategory === "All" ||
          item.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "low-high") {
          return a.price - b.price;
        }

        if (sortBy === "high-low") {
          return b.price - a.price;
        }

        if (sortBy === "rating") {
          return b.rating - a.rating;
        }

        return a.id - b.id;
      });
  }, [menuItems, searchTerm, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("default");
  };

  const categories = [
    "All",
    "Vegetarian",
    "Non-Vegetarian",
    "Special",
  ];

  if (loading) {
    return (
      <div className="menu">
        <h1 className="menuTitle">Our Menu</h1>

        <div className="noMenuResults">
          <h3>Loading delicious pizzas... 🍕</h3>
          <p>Getting our menu from the server.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>

      {apiError && (
        <div
          style={{
            width: "85%",
            maxWidth: "1100px",
            background: "#fff8e1",
            border: "1px solid #ffcc80",
            color: "#8a5a00",
            padding: "10px 15px",
            borderRadius: "8px",
            marginBottom: "10px",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          {apiError}
        </div>
      )}

      {/* SEARCH AND CATEGORY FILTER */}

      <div className="menuControls">
        <div className="searchBarContainer">
          <Search size={20} className="searchIcon" />

          <input
            type="text"
            placeholder="Search pizza by name or ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="menuSearchInput"
          />

          {searchTerm && (
            <button
              className="clearSearchBtn"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>

        {/* CATEGORY BUTTONS */}

        <div className="categoryTabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`categoryBtn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* SORT */}

        <div className="sortFilterWrapper">
          <SlidersHorizontal size={16} />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sortSelect"
          >
            <option value="default">Default Sort</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* RESULT COUNT */}

      <div className="menuResultsCount">
        Showing <strong>{filteredPizzas.length}</strong> of{" "}
        <strong>{menuItems.length}</strong> pizzas
      </div>

      {/* MENU */}

      {filteredPizzas.length === 0 ? (
        <div className="noMenuResults">
          <h3>No pizzas found 🍕</h3>

          <p>
            No pizzas match your search for{" "}
            <strong>"{searchTerm}"</strong>.
          </p>

          <button onClick={resetFilters} className="resetFilterBtn">
            <RotateCcw size={16} />
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="menuList">
          {filteredPizzas.map((menuItem) => (
            <MenuItem
              key={menuItem.id}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
              description={menuItem.description}
              category={menuItem.category}
              rating={menuItem.rating}
              isVeg={menuItem.isVeg}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;