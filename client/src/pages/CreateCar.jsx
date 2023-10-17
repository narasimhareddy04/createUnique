import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
// import "../css/CreateCar.css";

const CreateCar = () => {
  const navigate = useNavigate();

  // States for the customization options fetched from the database
  const [carModels, setCarModels] = useState([]);
  const [exteriors, setExteriors] = useState([]);
  const [interiors, setInteriors] = useState([]);
  const [roofs, setRoofs] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [carId, setCarId] = useState([]);
  // States for the selected customization options
  const [selectedCarModel, setSelectedCarModel] = useState("");
  const [selectedExterior, setSelectedExterior] = useState("");
  const [selectedInterior, setSelectedInterior] = useState("");
  const [selectedRoof, setSelectedRoof] = useState("");
  const [selectedWheel, setSelectedWheel] = useState("");

  // Fetch customizations from the database when the component mounts
  useEffect(() => {
    // For simplicity, I'm using fetch. You might be using axios or another library.

    fetch("/api/cars")
      .then((response) => response.json())
      .then((data) => {
        setCarModels(data);
        if (data.length > 0) setSelectedCarModel(data[0].model_name); // Default to the first item
      });

    fetch("/api/exteriors")
      .then((response) => response.json())
      .then((data) => {
        setExteriors(data);
        if (data.length > 0) setSelectedExterior(data[0].custom_value);
      });

    fetch("/api/interiors")
      .then((response) => response.json())
      .then((data) => {
        setInteriors(data);
        if (data.length > 0) setSelectedInterior(data[0].custom_value);
      });

    fetch("/api/roofs")
      .then((response) => response.json())
      .then((data) => {
        setRoofs(data);
        if (data.length > 0) setSelectedRoof(data[0].custom_value);
      });

    fetch("/api/wheels")
      .then((response) => response.json())
      .then((data) => {
        setWheels(data);
        if (data.length > 0) setSelectedWheel(data[0].custom_value);
      });
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const handleCreateCar = async () => {
    try {
      const response = await fetch("/api/user-custom-cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: selectedCarModel,
          exterior: selectedExterior,
          interior: selectedInterior,
          roof: selectedRoof,
          wheels: selectedWheel,
        }),
      });

      if (!response.ok) {
        console.error("Error posting car:", response.statusText);
        return;
      }

      const data = await response.json();

      setCarId(data.id);
      navigate(`/customcars/${data.id}`);
    } catch (error) {
      console.error("Error in handleCreateCar:", error);
    }
  };

  return (
    <div className="create-car-container">
      <label>
        Car Model:
        <select
          value={selectedCarModel}
          onChange={(e) => setSelectedCarModel(e.target.value)}
        >
          {carModels.map((model) => (
            <option key={model.id} value={model.model_name}>
              {model.model_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Exterior Color:
        <select
          value={selectedExterior}
          onChange={(e) => setSelectedExterior(e.target.value)}
        >
          {exteriors.map((exterior) => (
            <option key={exterior.id} value={exterior.custom_value}>
              {exterior.custom_value}
            </option>
          ))}
        </select>
      </label>

      <label>
        Interior Design:
        <select
          value={selectedInterior}
          onChange={(e) => setSelectedInterior(e.target.value)}
        >
          {interiors.map((interior) => (
            <option key={interior.id} value={interior.custom_value}>
              {interior.custom_value}
            </option>
          ))}
        </select>
      </label>

      <label>
        Roof:
        <select
          value={selectedRoof}
          onChange={(e) => setSelectedRoof(e.target.value)}
        >
          {roofs.map((roof) => (
            <option key={roof.id} value={roof.custom_value}>
              {roof.custom_value}
            </option>
          ))}
        </select>
      </label>

      <label>
        Wheels:
        <select
          value={selectedWheel}
          onChange={(e) => setSelectedWheel(e.target.value)}
        >
          {wheels.map((wheel) => (
            <option key={wheel.id} value={wheel.custom_value}>
              {wheel.custom_value}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleCreateCar}>Create</button>
    </div>
  );
};

export default CreateCar;
