import Pepperoni from "../assets/pepperoni.jpg";
import Margherita from "../assets/margherita.jpg";
import PedroTechSpecial from "../assets/pedrotechspecial.jpg";
import Vegan from "../assets/vegan.jpg";
import Pineapple from "../assets/pineapple.jpg";
import Expensive from "../assets/expensive.jpg";

export const MenuList = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    image: Pepperoni,
    price: 15.99,
    category: "Classic",
    description: "Classic hand-tossed crust loaded with Italian pepperoni and premium mozzarella.",
    rating: 4.9,
    isVeg: false
  },
  {
    id: 2,
    name: "Margherita Pizza",
    image: Margherita,
    price: 11.99,
    category: "Vegetarian",
    description: "Traditional Neapolitan pizza with San Marzano tomatoes, fresh basil, and buffalo mozzarella.",
    rating: 4.8,
    isVeg: true
  },
  {
    id: 3,
    name: "PedroTech Special Pizza",
    image: PedroTechSpecial,
    price: 256.53,
    category: "Special",
    description: "Our signature Brazilian chef special topped with seasoned chicken, catupiry cheese, and hearts of palm.",
    rating: 5.0,
    isVeg: false
  },
  {
    id: 4,
    name: "Vegan Pizza",
    image: Vegan,
    price: 17.99,
    category: "Vegetarian",
    description: "Crispy crust topped with garden veggies, sun-dried tomatoes, and organic plant-based mozzarella.",
    rating: 4.7,
    isVeg: true
  },
  {
    id: 5,
    name: "Pineapple Pizza",
    image: Pineapple,
    price: 4.99,
    category: "Classic",
    description: "The sweet and savory Hawaiian favorite with caramelized pineapple chunks and smoked ham.",
    rating: 4.5,
    isVeg: false
  },
  {
    id: 6,
    name: "Very Expensive Pizza",
    image: Expensive,
    price: 1997.99,
    category: "Premium",
    description: "Luxury culinary masterpiece garnished with edible 24k gold leaf, black truffles, and Sevruga caviar.",
    rating: 5.0,
    isVeg: false
  },
];
