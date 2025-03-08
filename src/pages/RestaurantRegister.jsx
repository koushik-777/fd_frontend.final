import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RestaurantRegister.css";

const RestaurantRegister = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    address: "",
    contact: "",
    cuisine: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/restaurant/register",
        formData
      );
      console.log("Registration successful:", response.data);
      // Redirect to login page
      navigate("/restaurant/login");
    } catch (error) {
      console.error("Registration error:", error.response.data);
      // Show error message
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h1>Restaurant Registration</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="restaurantName"
            placeholder="Restaurant Name"
            value={formData.restaurantName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cuisine"
            placeholder="Cuisine Type"
            value={formData.cuisine}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/restaurant/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RestaurantRegister;
