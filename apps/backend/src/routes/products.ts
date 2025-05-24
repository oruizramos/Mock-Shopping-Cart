import express from "express";
import { openDb } from "../db/database";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await openDb();
    const products = await db.all("SELECT * FROM products");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

export default router;
