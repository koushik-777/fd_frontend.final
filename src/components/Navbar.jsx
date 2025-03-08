import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../assets/logo.gif"; // Import your GIF logo

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav
      className="navbar fixed-top navbar-dark bg-danger"
      style={{ transition: "background-color 0.5s ease" }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo} // Use the imported GIF logo
              alt="DineEase Logo"
              width="50"
              height="40"
              className="d-inline-block align-text-top"
            />
            <span className="ms-2">DineEase</span>
          </Link>
          <div className="d-flex align-items-center ms-3">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-white me-2"
            />
            <span className="text-white">Chennai</span>
          </div>
        </div>
        <ul className="navbar-nav flex-row mb-0">
          <li className="nav-item px-3">
            <Link
              className={`nav-link ${
                activeLink === "Home" ? "active" : ""
              } cursor-pointer`}
              to="/"
              onClick={() => handleNavClick("Home")}
            >
              Home
            </Link>
          </li>
          <li className="nav-item px-3">
            <span
              className={`nav-link ${
                activeLink === "Contact" ? "active" : ""
              } cursor-pointer`}
              onClick={() => handleNavClick("Contact")}
            >
              Contact
            </span>
          </li>
          <li className="nav-item px-3">
            <Link
              className={`nav-link ${activeLink === "Login" ? "active" : ""}`}
              to="/login"
              onClick={() => handleNavClick("Login")}
            >
              Login/Register
            </Link>
          </li>
          <li className="nav-item px-3">
            <Link
              className={`nav-link ${
                activeLink === "RestaurantAuth" ? "active" : ""
              }`}
              to="/restaurant/login"
              onClick={() => handleNavClick("RestaurantAuth")}
            >
              Restaurant Login/Register
            </Link>
          </li>
        </ul>
        <form className="d-flex ms-3" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;

// Attribution for icons
<a href="https://lordicon.com/">Icons by Lordicon.com</a>;
