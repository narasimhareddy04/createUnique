import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import "../css/EditCar.css";
const EditCar = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the car ID from the URL params

  // States for the customization options fetched from the database
  const [carModels, setCarModels] = useState([]);
  const [exteriors, setExteriors] = useState([]);
  const [interiors, setInteriors] = useState([]);
  const [roofs, setRoofs] = useState([]);
  const [wheels, setWheels] = useState([]);

  // States for the selected customization options
  const [selectedCarModel, setSelectedCarModel] = useState("");
  const [selectedExterior, setSelectedExterior] = useState("");
  const [selectedInterior, setSelectedInterior] = useState("");
  const [selectedRoof, setSelectedRoof] = useState("");
  const [selectedWheel, setSelectedWheel] = useState("");

  useEffect(() => {
    // Fetching the car models
    fetch("/api/cars")
      .then((response) => response.json())
      .then((data) => setCarModels(data));

    // Fetching the exteriors
    fetch("/api/exteriors")
      .then((response) => response.json())
      .then((data) => setExteriors(data));

    // Fetching the interiors
    fetch("/api/interiors")
      .then((response) => response.json())
      .then((data) => setInteriors(data));

    // Fetching the roofs
    fetch("/api/roofs")
      .then((response) => response.json())
      .then((data) => setRoofs(data));

    // Fetching the wheels
    fetch("/api/wheels")
      .then((response) => response.json())
      .then((data) => setWheels(data));
  }, [id]);

  const handleUpdateCar = async () => {
    try {
      console.log("Before await ");
      console.log(id);
      const response = await fetch(`/api/user-custom-cars/${id}`, {
        method: "PATCH", // Use PUT for updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: selectedCarModel,
          exterior: selectedExterior,
          interior: selectedInterior,
          roof: selectedRoof,
          wheels: selectedWheel,
        }),
      });
      console.log(response);
      if (!response.ok) {
        console.error("Error updating car:", response.statusText);
        return;
      }

      navigate(`/customcars/${id}`);
    } catch (error) {
      console.error("Error in handleUpdateCar:", error);
    }
  };

  return (
    <div className="edit-car-container">
      <h2 className="edit-car-title">Edit Car Customization</h2>

      <label className="edit-car-label">
        Car Model:
        <select
          className="edit-car-select"
          value={selectedCarModel}
          onChange={(e) => setSelectedCarModel(e.target.value)}
        >
          <option value="">Select a Car Model</option>
          {carModels.map((model) => (
            <option key={model.id} value={model.model_name}>
              {model.model_name}
            </option>
          ))}
        </select>
      </label>

      <label className="edit-car-label">
        Exterior:
        <select
          className="edit-car-select"
          value={selectedExterior}
          onChange={(e) => setSelectedExterior(e.target.value)}
        >
          <option value="">Select an Exterior</option>
          {exteriors.map((exterior) => (
            <option key={exterior.id} value={exterior.custom_value}>
              {exterior.custom_value}
            </option>
          ))}
        </select>
      </label>

      <label className="edit-car-label">
        Interior:
        <select
          className="edit-car-select"
          value={selectedInterior}
          onChange={(e) => setSelectedInterior(e.target.value)}
        >
          <option value="">Select an Interior</option>
          {interiors.map((interior) => (
            <option key={interior.id} value={interior.custom_value}>
              {interior.custom_value}
            </option>
          ))}
        </select>
      </label>

      <label className="edit-car-label">
        Roof:
        <select
          className="edit-car-select"
          value={selectedRoof}
          onChange={(e) => setSelectedRoof(e.target.value)}
        >
          <option value="">Select a Roof</option>
          {roofs.map((roof) => (
            <option key={roof.id} value={roof.custom_value}>
              {roof.custom_value}
            </option>
          ))}
        </select>
      </label>

      <label className="edit-car-label">
        Wheels:
        <select
          className="edit-car-select"
          value={selectedWheel}
          onChange={(e) => setSelectedWheel(e.target.value)}
        >
          <option value="">Select Wheels</option>
          {wheels.map((wheel) => (
            <option key={wheel.id} value={wheel.custom_value}>
              {wheel.custom_value}
            </option>
          ))}
        </select>
      </label>

      <button className="edit-car-btn" onClick={handleUpdateCar}>
        Update Car
      </button>
    </div>
  );
};

export default EditCar;
