import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ViewCars.css";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user-custom-cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const viewCarDetails = (id) => {
    navigate(`/customcars/${id}`);
  };

  return (
    <div className="view-cars-container">
      {cars.map((car) => (
        <div key={car.id} className="car-card">
          <img src={car.image_url} alt={car.model_name} className="car-image" />
          <h3>{car.model_name}</h3>
          <p>Exterior: {car.exterior}</p>
          <p>Interior: {car.interior}</p>
          <p>Roof: {car.roof}</p>
          <p>Wheels: {car.wheels}</p>
          <p className="car-price">${car.price}</p>
          <button onClick={() => viewCarDetails(car.id)} className="view-btn">
            View
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewCars;
