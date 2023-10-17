import React from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import ViewCars from "./pages/ViewCars";
import EditCar from "./pages/EditCar";
import CreateCar from "./pages/CreateCar";
import CarDetails from "./pages/CarDetails";

import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <CreateCar title="Create Unique | Customize" />,
    },
    {
      path: "/customcars",
      element: <ViewCars title="Create Unique  | Custom Cars" />,
    },
    {
      path: "/customcars/:id",
      element: <CarDetails title="Create Unique  | View" />,
    },
    {
      path: "/edit-custom-car/:id",
      element: <EditCar title="Create Unique  | Edit" />,
    },
  ]);

  return (
    <div className="app">
      <Navigation />

      {element}
    </div>
  );
};

export default App;
