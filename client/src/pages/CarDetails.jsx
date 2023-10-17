import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  UNSAFE_DataRouterStateContext,
} from "react-router-dom";
import "../App.css";
import "../css/CarDetails.css";
import Spinner from "../components/Spinner";
const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userCustomCar, setUserCustomCar] = useState(null);

  useEffect(() => {
    fetch(`/api/user-custom-cars/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserCustomCar(data[0]);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />; // Displaying a simple loading message
  }

  if (!userCustomCar) return <div>Error: No car data found!</div>;
  const handleEditClick = () => {
    navigate(`/edit-custom-car/${id}`);
  };
  const handleDeleteClick = () => {
    fetch(`/api/user-custom-cars/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // If successful, navigate to the home page
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting custom car:", error);
        // Optionally, you can also display an error message to the user
        alert("Failed to delete the car. Please try again.");
      });
  };
  return (
    <div className="car-detail-container">
      <div className="car-detail-card">
        <h3>{userCustomCar.model_name}</h3>
        <img src={userCustomCar.image_url} alt="Car" />
      </div>

      <div className="car-detail-card">
        <p>{userCustomCar.exterior}</p>
        <img src={userCustomCar.exterior_image} alt="Car exterior" />
      </div>
      <div className="car-detail-card">
        <p>{userCustomCar.interior}</p>
        <img src={userCustomCar.interior_image} alt="Car interior" />
      </div>
      <div className="car-detail-card">
        <p>{userCustomCar.roof}</p>
        <img src={userCustomCar.roof_image} alt="Car roof" />
      </div>
      <div className="car-detail-card">
        <p>{userCustomCar.wheels}</p>
        <img src={userCustomCar.wheels_image} alt="Car wheels" />
      </div>

      <div className="car-detail-card">
        <p>Cost: </p>
        <p>{userCustomCar.price}$</p>
      </div>
      <div className="button-container">
        <button className="edit-button" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
