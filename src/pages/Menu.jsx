import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUtensils,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

// Mock data for menus by restaurant ID
const menuData = {
  1: {
    // Spice Villa
    name: "Spice Villa",
    items: [
      {
        id: 101,
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken pieces",
        price: 12.99,
        category: "Main Course",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 102,
        name: "Paneer Tikka",
        description: "Grilled paneer cubes marinated in traditional spices",
        price: 10.99,
        category: "Starters",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 103,
        name: "Chicken Biryani",
        description: "Aromatic rice dish layered with spiced chicken",
        price: 13.99,
        category: "Rice",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 104,
        name: "Garlic Naan",
        description: "Flatbread with garlic flavor",
        price: 2.99,
        category: "Bread",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 105,
        name: "Gulab Jamun",
        description: "Sweet milk solids balls soaked in sugar syrup",
        price: 4.99,
        category: "Dessert",
        image: "https://via.placeholder.com/150",
      },
    ],
  },
  2: {
    // Curry Corner
    name: "Curry Corner",
    items: [
      {
        id: 201,
        name: "Chicken Curry",
        description: "Spicy chicken curry with a rich gravy",
        price: 11.99,
        category: "Main Course",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 202,
        name: "Lamb Vindaloo",
        description: "Tender lamb cooked in a spicy vindaloo sauce",
        price: 14.99,
        category: "Main Course",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 203,
        name: "Vegetable Korma",
        description: "Mixed vegetables cooked in a creamy korma sauce",
        price: 10.99,
        category: "Main Course",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 204,
        name: "Pulao Rice",
        description: "Fragrant rice cooked with spices",
        price: 3.99,
        category: "Rice",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 205,
        name: "Kulfi",
        description: "Traditional Indian ice cream",
        price: 4.99,
        category: "Dessert",
        image: "https://via.placeholder.com/150",
      },
    ],
  },
  3: {
    // Tandoori House
    name: "Tandoori House",
    items: [
      {
        id: 301,
        name: "Tandoori Chicken",
        description:
          "Chicken marinated in yogurt and spices, grilled in tandoor",
        price: 12.99,
        category: "Starters",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 302,
        name: "Seekh Kebab",
        description: "Minced meat with herbs and spices grilled on skewers",
        price: 11.99,
        category: "Starters",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 303,
        name: "Butter Naan",
        description: "Soft flatbread brushed with butter",
        price: 2.99,
        category: "Bread",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 304,
        name: "Dal Makhani",
        description: "Black lentils cooked with butter and cream",
        price: 9.99,
        category: "Main Course",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 305,
        name: "Gajar Halwa",
        description: "Sweet carrot pudding with nuts",
        price: 5.99,
        category: "Dessert",
        image: "https://via.placeholder.com/150",
      },
    ],
  },
};

const Menu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState({ name: "", items: [] });
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Starters",
    "Main Course",
    "Rice",
    "Bread",
    "Dessert",
  ];

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const restaurantMenu = menuData[id];
    if (restaurantMenu) {
      setMenu(restaurantMenu);
    } else {
      // Handle case where restaurant doesn't exist
      setMenu({ name: "Restaurant not found", items: [] });
    }
  }, [id]);

  const addToCart = (item) => {
    // Check if item already exists in cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Update quantity if item exists
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      setCart(cart.filter((item) => item.id !== id));
    } else {
      // Update quantity
      setCart(
        cart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleCheckout = () => {
    // Navigate to payment page with cart and restaurant info
    navigate("/payment", {
      state: {
        cart,
        restaurant: { id, name: menu.name },
      },
    });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredItems = menu.items.filter((item) => {
    const matchesFilter =
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;

    return matchesFilter && matchesCategory;
  });

  return (
    <div className="menu-container container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{menu.name} Menu</h1>
        <div className="cart-preview">
          <button
            className="btn btn-primary position-relative"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartOffcanvas"
          >
            <FontAwesomeIcon icon={faShoppingCart} /> View Cart
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faFilter} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search for dishes"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="category-filter d-flex flex-wrap justify-content-md-end">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm m-1 ${
                  category === cat ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row menu-items">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 menu-item">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title">{item.name}</h5>
                    <span className="badge bg-light text-dark">
                      {item.category}
                    </span>
                  </div>
                  <p className="card-text description">{item.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="price mb-0">${item.price.toFixed(2)}</p>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No dishes found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Cart Offcanvas */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Your Cart</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.map((item) => (
            <div key={item.id} className="cart-item mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5>{item.name}</h5>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => updateQuantity(item.id, 0)}
                >
                  Remove
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Quantity:</p>
                <input
                  type="number"
                  className="form-control w-25"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                />
              </div>
              <p className="mb-0">Total: ${item.price * item.quantity}</p>
            </div>
          ))}
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <button className="btn btn-primary w-100" onClick={handleCheckout}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
