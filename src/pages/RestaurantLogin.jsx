import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/apiPAth"; // Import API_URL from apiPAth.js
import "./RestaurantLogin.css";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/restaurants/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store authentication data
      localStorage.setItem("restaurantToken", data.token);
      localStorage.setItem(
        "restaurantId",
        data.restaurant._id || data.restaurant.id
      );

      // Redirect to dashboard
      navigate("/restaurant/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Restaurant Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span
            className="text-danger cursor-pointer"
            onClick={() => navigate("/restaurant/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default RestaurantLogin;
