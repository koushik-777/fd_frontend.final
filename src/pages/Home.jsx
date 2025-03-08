import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import butterChickenImage from "../assets/butterchik.png";
import paneerTikkaImage from "../assets/pt.png";
import biryaniImage from "../assets/biriyani.png";
import spiceVillaImage from "../assets/res2.jpg";
import curryCornerImage from "../assets/res3.jpg";
import tandooriHouseImage from "../assets/res4.jpg";
import masalaMagicImage from "../assets/res5.jpg";
import naanCurryImage from "../assets/res6.jpg";
import saffronDelightImage from "../assets/res7.jpg";
import tikkaTreatsImage from "../assets/res8.jpg";
import royalRotiImage from "../assets/res9.jpg";

const dishes = [
  {
    id: 1,
    name: "Butter Chicken",
    image: butterChickenImage,
    description: "Creamy tomato-based curry with tender chicken pieces.",
  },
  {
    id: 2,
    name: "Paneer Tikka",
    image: paneerTikkaImage,
    description: "Grilled paneer cubes marinated in traditional spices.",
  },
  {
    id: 3,
    name: "Biryani",
    image: biryaniImage,
    description: "Aromatic rice dish layered with spiced meat or vegetables.",
  },
];

const restaurants = [
  {
    id: 1,
    name: "Spice Villa",
    image: spiceVillaImage,
    description: "Experience authentic Indian flavors in a royal setting.",
  },
  {
    id: 2,
    name: "Curry Corner",
    image: curryCornerImage,
    description: "Delicious curries and a vibrant dining atmosphere.",
  },
  {
    id: 3,
    name: "Tandoori House",
    image: tandooriHouseImage,
    description: "Specializing in tandoori and freshly grilled items.",
  },
  {
    id: 4,
    name: "Masala Magic",
    image: masalaMagicImage,
    description: "Experience the spicy explosion of flavors in every bite.",
  },
  {
    id: 5,
    name: "Naan & Curry",
    image: naanCurryImage,
    description: "Traditional naan and flavorful curries freshly served.",
  },
  {
    id: 6,
    name: "Saffron Delight",
    image: saffronDelightImage,
    description: "Savor the burst of exotic saffron flavors.",
  },
  {
    id: 7,
    name: "Tikka Treats",
    image: tikkaTreatsImage,
    description: "Indulge in smoky, grilled delicacies at every turn.",
  },
  {
    id: 8,
    name: "Royal Roti",
    image: royalRotiImage,
    description: "Feast like royalty with our freshly baked rotis.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleOrderNow = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

  return (
    <div className="container-fluid pt-5">
      <header className="my-4 text-center">
        <h1>Welcome to DineEase</h1>
        <p className="lead">
          Discover the best Indian cuisines and restaurants in your area
        </p>
      </header>

      <section className="mb-5">
        <h2 className="mb-4">Popular Dishes</h2>
        <div className="row">
          {dishes.map((dish) => (
            <div className="col-md-4 mb-4" key={dish.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={dish.image}
                  className="card-img-top img-fluid"
                  alt={dish.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{dish.name}</h5>
                  <p className="card-text">{dish.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="mb-4">Restaurants</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {restaurants.map((rest) => (
            <div className="col" key={rest.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={rest.image}
                  className="card-img-top img-fluid"
                  alt={rest.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{rest.name}</h5>
                  <p className="card-text">{rest.description}</p>
                </div>
                <div className="card-footer bg-white">
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => handleOrderNow(rest.id)}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-4">
        <p className="mb-0">&copy; 2025 DineEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
