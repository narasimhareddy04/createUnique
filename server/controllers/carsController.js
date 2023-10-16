// Importing pool from database.js
import { pool } from "../config/database.js";

const getAllUserCustomCars = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM UserCustomCars ");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserCustomCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(
      "SELECT * FROM UserCustomCars WHERE id =$1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCars = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Cars");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("SELECT * FROM Cars WHERE id =$1", [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllExteriors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ExteriorDesign");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExterior = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(
      "SELECT * FROM ExteriorDesign WHERE id =$1",
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllInteriors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM InteriorDesign");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInterior = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(
      "SELECT * FROM InteriorDesign WHERE id =$1",
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRoofs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM RoofOptions");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoof = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("SELECT * FROM RoofOptions WHERE id =$1", [
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllWheels = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM WheelsOptions");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWheels = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(
      "SELECT * FROM WheelsOptions WHERE id =$1",
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addExterior = async (req, res) => {
  try {
    const { exterior, image, price } = req.body;
    const result = await pool.query(
      "INSERT INTO ExteriorDesign (custom_value, image_url, price) VALUES ($1, $2, $3) RETURNING *",
      [exterior, image, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const addInterior = async (req, res) => {
  try {
    const { interior, image, price } = req.body;
    const result = await pool.query(
      "INSERT INTO InteriorDesign (custom_value, image_url, price) VALUES ($1, $2, $3) RETURNING *",
      [interior, image, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const addRoofOption = async (req, res) => {
  try {
    const { roofOption, image, price } = req.body;
    const result = await pool.query(
      "INSERT INTO RoofOptions (custom_value, image_url, price) VALUES ($1, $2, $3) RETURNING *",
      [roofOption, image, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const addWheelOption = async (req, res) => {
  try {
    const { wheelOption, image, price } = req.body;
    const result = await pool.query(
      "INSERT INTO WheelsOptions (custom_value, image_url, price) VALUES ($1, $2, $3) RETURNING *",
      [wheelOption, image, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const addCar = async (req, res) => {
  try {
    const { model_name, image, base_price } = req.body;
    const result = await pool.query(
      "INSERT INTO Cars (model_name, image_url, base_price) VALUES ($1, $2, $3) RETURNING *",
      [model_name, image, base_price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const addUserCustomCar = async (req, res) => {
  const client = await pool.connect();
  try {
    const { model_name, exterior, interior, roof, wheels } = req.body;

    // Start transaction
    await client.query("BEGIN");

    const carBasePrice = await client.query(
      "SELECT base_price from Cars WHERE model_name =$1",
      [model_name]
    );
    const carImage = await client.query(
      "SELECT image_url from Cars WHERE model_name =$1",
      [model_name]
    );

    // Fetch prices for each customization
    const exteriorPriceResult = await client.query(
      "SELECT price FROM ExteriorDesign WHERE custom_value = $1",
      [exterior]
    );
    const exterior_image = await client.query(
      "SELECT image_url FROM ExteriorDesign WHERE custom_value = $1",
      [exterior]
    );

    const interiorPriceResult = await client.query(
      "SELECT price FROM InteriorDesign WHERE custom_value = $1",
      [interior]
    );
    const interior_image = await client.query(
      "SELECT image_url FROM InteriorDesign WHERE custom_value = $1",
      [interior]
    );

    const roofPriceResult = await client.query(
      "SELECT price FROM RoofOptions WHERE custom_value = $1",
      [roof]
    );
    const roof_image = await client.query(
      "SELECT image_url FROM RoofOptions WHERE custom_value = $1",
      [roof]
    );

    const wheelsPriceResult = await client.query(
      "SELECT price FROM WheelsOptions WHERE custom_value = $1",
      [wheels]
    );
    const wheels_image = await client.query(
      "SELECT image_url FROM WheelsOptions WHERE custom_value = $1",
      [wheels]
    );

    // Calculate the total cost
    const totalCost =
      parseFloat(carBasePrice.rows[0]?.base_price || 0) +
      parseFloat(exteriorPriceResult.rows[0]?.price || 0) +
      parseFloat(interiorPriceResult.rows[0]?.price || 0) +
      parseFloat(roofPriceResult.rows[0]?.price || 0) +
      parseFloat(wheelsPriceResult.rows[0]?.price || 0);

    // Insert data into UserCustomCars and get the ID
    const result = await client.query(
      `INSERT INTO UserCustomCars 
      (model_name, price, image_url, exterior, interior, roof, wheels, 
      exterior_image, interior_image, roof_image, wheels_image) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [
        model_name,
        totalCost,
        carImage.rows[0]?.image_url,
        exterior,
        interior,
        roof,
        wheels,
        exterior_image.rows[0]?.image_url,
        interior_image.rows[0]?.image_url,
        roof_image.rows[0]?.image_url,
        wheels_image.rows[0]?.image_url,
      ]
    );

    // Commit transaction
    await client.query("COMMIT");

    // Send response
    res.status(201).json({
      message: "User custom car added successfully!",
      userCustomCarId: result.rows[0].id,
      totalCost,
    });
  } catch (error) {
    // If an error occurs, rollback the transaction
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    // Always release the client
    client.release();
  }
};

const updateExterior = async (req, res) => {
  try {
    const { id } = req.params;
    const { exterior, price, image } = req.body;
    const result = await pool.query(
      "UPDATE ExteriorDesign SET custom_value = $1, price = $2, image_url = $3  WHERE id = $4 RETURNING *",
      [exterior, price, image, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateInterior = async (req, res) => {
  try {
    const { id } = req.params;
    const { interior, price, image } = req.body;
    const result = await pool.query(
      "UPDATE InteriorDesign SET custom_value = $1, price = $2, image_url = $3  WHERE id = $4 RETURNING *",
      [interior, price, image, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateRoof = async (req, res) => {
  try {
    const { id } = req.params;
    const { roof, price, image } = req.body;
    const result = await pool.query(
      "UPDATE RoofOptions SET custom_value = $1, price = $2, image_url = $3  WHERE id = $4 RETURNING *",
      [roof, price, image, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateWheels = async (req, res) => {
  try {
    const { id } = req.params;
    const { wheels, price, image } = req.body;
    const result = await pool.query(
      "UPDATE WheelsOptions SET custom_value = $1, price = $2, image_url = $3  WHERE id = $4 RETURNING *",
      [wheels, price, image, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { model_name, base_price, image } = req.body;
    const result = await pool.query(
      "UPDATE Cars SET model_name = $1, base_price = $2, image_url = $3  WHERE id = $4 RETURNING *",
      [model_name, base_price, image, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateUserCustomCar = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id, model_name, exterior, interior, roof, wheels } = req.body;

    // Start transaction
    await client.query("BEGIN");

    const carBasePrice = await client.query(
      "SELECT base_price from Cars WHERE model_name =$1",
      [model_name]
    );
    const carImage = await client.query(
      "SELECT image_url from Cars WHERE model_name =$1",
      [model_name]
    );

    // Fetch prices for each customization
    const exteriorPriceResult = await client.query(
      "SELECT price, image_url FROM ExteriorDesign WHERE custom_value = $1",
      [exterior]
    );

    const interiorPriceResult = await client.query(
      "SELECT price, image_url FROM InteriorDesign WHERE custom_value = $1",
      [interior]
    );

    const roofPriceResult = await client.query(
      "SELECT price, image_url FROM RoofOptions WHERE custom_value = $1",
      [roof]
    );

    const wheelsPriceResult = await client.query(
      "SELECT price, image_url FROM WheelsOptions WHERE custom_value = $1",
      [wheels]
    );

    // Calculate the total cost
    const totalCost =
      parseFloat(carBasePrice.rows[0]?.base_price || 0) +
      parseFloat(exteriorPriceResult.rows[0]?.price || 0) +
      parseFloat(interiorPriceResult.rows[0]?.price || 0) +
      parseFloat(roofPriceResult.rows[0]?.price || 0) +
      parseFloat(wheelsPriceResult.rows[0]?.price || 0);

    // Update data in UserCustomCars based on the given ID
    await client.query(
      `UPDATE UserCustomCars SET 
      model_name=$2, price=$3, image_url=$4, exterior=$5, interior=$6, 
      roof=$7, wheels=$8, exterior_image=$9, interior_image=$10, 
      roof_image=$11, wheels_image=$12 
      WHERE id=$1`,
      [
        id,
        model_name,
        totalCost,
        carImage.rows[0]?.image_url,
        exterior,
        interior,
        roof,
        wheels,
        exteriorPriceResult.rows[0]?.image_url,
        interiorPriceResult.rows[0]?.image_url,
        roofPriceResult.rows[0]?.image_url,
        wheelsPriceResult.rows[0]?.image_url,
      ]
    );

    // Commit transaction
    await client.query("COMMIT");

    // Send response
    res.status(200).json({
      message: "User custom car updated successfully!",
      totalCost,
    });
  } catch (error) {
    // If an error occurs, rollback the transaction
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    // Always release the client
    client.release();
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM Cars WHERE id=$1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteExterior = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM ExteriorDesign WHERE id=$1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteInterior = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM InteriorDesign WHERE id=$1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteRoof = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM RoofOptions WHERE id=$1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteWheels = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM WheelsOptions WHERE id=$1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteUserCustomCar = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM UserCustomCars WHERE id=$1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export {
  getAllUserCustomCars,
  getAllCars,
  getCar,
  getExterior,
  getInterior,
  getRoof,
  getUserCustomCar,
  getWheels,
  getAllExteriors,
  getAllInteriors,
  getAllRoofs,
  getAllWheels,
  addExterior,
  addInterior,
  addWheelOption,
  addCar,
  addUserCustomCar,
  addRoofOption,
  updateCar,
  updateExterior,
  updateInterior,
  updateRoof,
  updateUserCustomCar,
  updateWheels,
  deleteCar,
  deleteExterior,
  deleteInterior,
  deleteRoof,
  deleteUserCustomCar,
  deleteWheels,
};
