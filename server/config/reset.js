import { pool } from "./database.js";

const createAndSeedTables = async () => {
  const createTableQuery = `
        
  DROP TABLE IF EXISTS WheelsOptions, RoofOptions, InteriorDesign, ExteriorDesign, Cars, UserCustomCars;
        CREATE TABLE Cars (
            id SERIAL PRIMARY KEY,
            model_name VARCHAR(255) ,
            base_price DECIMAL(15,2) ,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
        );

        CREATE TABLE UserCustomCars (
            id SERIAL PRIMARY KEY,
            model_name VARCHAR(255),
            price DECIMAL(15,2) ,
            image_url TEXT,
            exterior VARCHAR(50) ,
            exterior_image TEXT,
            interior VARCHAR(50) ,
            interior_image TEXT,
            roof VARCHAR(50) ,
            roof_image TEXT,
            wheels VARCHAR(50) ,
            wheels_image TEXT
        );
        
        CREATE TABLE ExteriorDesign (
            id SERIAL PRIMARY KEY,
            custom_value VARCHAR(50) ,
            price DECIMAL(15,2) ,
            image_url TEXT
        );
  
        CREATE TABLE InteriorDesign (
            id SERIAL PRIMARY KEY,
            custom_value VARCHAR(50),
            price DECIMAL(15,2) ,
            image_url TEXT
        );
  
        CREATE TABLE RoofOptions (
            id SERIAL PRIMARY KEY,
            custom_value VARCHAR(50),
            price DECIMAL(15,2) ,
            image_url TEXT
        );
  
        CREATE TABLE WheelsOptions (
            id SERIAL PRIMARY KEY,
            custom_value VARCHAR(50) ,
            price DECIMAL(15,2) ,
            image_url TEXT
        );


        INSERT INTO Cars (model_name, base_price, image_url) VALUES 
        ('Swift Dzire', 2000, 'http://example.com/red.png'), 
        ('Bugatti', 2200, 'http://example.com/blue.png');

        INSERT INTO ExteriorDesign (custom_value, price, image_url) VALUES 
        ('Red', 2000, 'http://example.com/red.png'), 
        ('Blue', 2200, 'http://example.com/blue.png');
  
        INSERT INTO InteriorDesign (custom_value, price, image_url) VALUES 
        ('Leather', 2500, 'http://example.com/leather.png'), 
        ('Fabric', 1500, 'http://example.com/fabric.png');
  
        INSERT INTO RoofOptions (custom_value, price, image_url) VALUES 
        ('Sunroof', 1800, 'http://example.com/sunroof.png'), 
        ('Panoramic', 2200, 'http://example.com/panoramic.png');
  
        INSERT INTO WheelsOptions (custom_value, price, image_url) VALUES 
        ('Alloy 18', 2400, 'http://example.com/alloy18.png'), 
        ('Alloy 19', 2600, 'http://example.com/alloy19.png');
    `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 Tables created and seeded successfully");
  } catch (error) {
    console.error("🚨 Error creating tables:", error);
  } finally {
    await pool.end();
  }
};

createAndSeedTables();
