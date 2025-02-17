import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Product (Admin only)
router.post("/", async (req, res) => {
  const { name, price, category, imageUrl } = req.body;
  try {
    // const product = new Product.insertMany({ name, price, category, imageUrl });
    // await product.save();
    const product = await Product.insertMany(req.body);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get All Products Route
router.get("/items", authMiddleware, async (req, res) => {
  try {
    const grocery_items = await Product.find({});
    return res
      .status(200)
      .json({ message: "Data retrieved successfully", grocery_items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
