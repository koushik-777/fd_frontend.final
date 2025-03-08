import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/apiPAth"; // Import API_URL
import Aurora from "./Aurora";
import "./Login.css";

const Login = () => {
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
      const response = await fetch(`${API_URL}/api/user/login`, {
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
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userId", data.user._id);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    console.log("Google login successful:", response);
    setIsLoading(true);

    try {
      // Send the token to your backend
      const backendResponse = await fetch(`${API_URL}/api/users/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await backendResponse.json();

      if (!backendResponse.ok) {
        throw new Error(data.message || "Google login failed");
      }

      // Store authentication data
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userId", data.user._id);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err.message || "Google login failed");
      console.error("Google login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed:", error);
    setError("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="login-wrapper">
        <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={0.5} />
        <div className="login-container">
          <div className="card shadow-lg">
            <div className="card-header text-center">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
              <div className="text-center my-3">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                />
              </div>
            </div>
            <div className="card-footer text-center">
              <small>
                Don't have an account?{" "}
                <span
                  className="text-danger cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
