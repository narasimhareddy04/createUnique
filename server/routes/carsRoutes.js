import express from "express";
import {
  addCar,
  addExterior,
  addInterior,
  addRoofOption,
  addUserCustomCar,
  addWheelOption,
  deleteCar,
  deleteExterior,
  deleteInterior,
  deleteRoof,
  deleteUserCustomCar,
  deleteWheels,
  getAllCars,
  getCar,
  getAllExteriors,
  getAllInteriors,
  getAllRoofs,
  getAllUserCustomCars,
  getAllWheels,
  updateCar,
  updateExterior,
  updateInterior,
  updateRoof,
  updateUserCustomCar,
  updateWheels,
  getUserCustomCar,
  getExterior,
  getInterior,
  getRoof,
  getWheels,
} from "../controllers/carsController.js";

const router = express.Router();

router.get("/user-custom-cars", getAllUserCustomCars);
router.get("/user-custom-cars/:id", getUserCustomCar);
router.get("/cars", getAllCars);
router.get("/cars/:id", getCar);
router.get("/exteriors", getAllExteriors);
router.get("/exteriors/:id", getExterior);
router.get("/interiors", getAllInteriors);
router.get("/interiors/:id", getInterior);
router.get("/roofs", getAllRoofs);
router.get("/roofs/:id", getRoof);
router.get("/wheels", getAllWheels);
router.get("/wheels/:id", getWheels);

router.post("/cars/", addCar);
router.post("/exteriors/", addExterior);
router.post("/interiors/", addInterior);
router.post("roofs/", addRoofOption);
router.post("/wheels/", addWheelOption);

router.post("/user-custom-cars", addUserCustomCar);

router.patch("/cars/:id", updateCar);
router.patch("/exteriors/:id", updateExterior);
router.patch("/interiors/:id", updateInterior);
router.patch("roofs/:id", updateRoof);
router.patch("/wheels/:id", updateWheels);

router.patch("/user-custom-cars/:id", updateUserCustomCar);

router.delete("/cars/:id", deleteCar);
router.delete("/exteriors/:id", deleteExterior);
router.delete("/interiors/:id", deleteInterior);
router.delete("roofs/:id", deleteRoof);
router.delete("/wheels/:id", deleteWheels);

router.delete("/user-custom-cars/:id", deleteUserCustomCar);

export default router;
