import envConfig from "./config/envConfig.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import jwt from "jsonwebtoken"; // Import jsonwebtoken
import Product from "./models/Product.js"; // Import the Product model
import Category from "./models/Category.js"; // Import the Category model
import authRoute from "./routes/authRoutes.js"; // Import the authRoute

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/E-commerce", {

  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", authRoute); // Mount authRoute with /api/auth prefix

// Endpoint to fetch categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories from MongoDB
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Endpoint to fetch products by category or sub-category
app.get("/products", async (req, res) => {
  try {
    const category = req.query.category; // Get the category or sub-category from the query parameter
    if (!category) {
      return res.status(400).json({ message: "Category parameter is required" });
    }

    // Fetch products based on the category or sub-category
    const products = await Product.find({
      $or: [{ category: category }, { subCategory: category }],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for the specified category" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Endpoint to fetch related products
app.get("/products/related", async (req, res) => {
  try {
    const category = req.query.category; // Get the category from the query parameter
    if (!category) {
      return res.status(400).json({ message: "Category parameter is required" });
    }

    // Fetch related products from the database
    const relatedProducts = await Product.find({ category }).limit(4); // Fetch 4 related products
    if (relatedProducts.length === 0) {
      return res.status(404).json({ message: "No related products found" });
    }

    res.json(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Endpoint to fetch a single product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Mock database
let orders = [];

// Place Order Endpoint
app.post("/place-order", (req, res) => {
  const { userId, items, totalPrice, address, paymentMethod } = req.body;

  if (!userId || !items || !totalPrice || !address || !paymentMethod) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const order = {
    id: orders.length + 1,
    userId,
    items,
    totalPrice,
    address,
    paymentMethod,
    status: "Pending",
  };

  orders.push(order); // Save order to the mock database
  res.status(201).json({ message: "Order placed successfully", order });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
//   console.log(`Server is running on port ${envConfig.port}`);
// console.log(`MongoDB URI: ${envConfig.mongodbUri}`);
// console.log(`JWT Secret: ${envConfig.jwtSecret}`);
// console.log(`Email User: ${envConfig.email.user}`);
// console.log(`Email Password: ${envConfig.email.pass}`);
});