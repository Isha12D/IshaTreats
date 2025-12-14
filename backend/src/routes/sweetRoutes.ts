import express from "express";
import Sweet from "../models/Sweet";
import { protect } from "../middleware/auth";
import { adminOnly } from "../middleware/adminMiddleware";

const router = express.Router();

/* ---------------- ADD SWEET (ADMIN) ---------------- */
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, category, price, quantity, image } = req.body;

    if (!name || !category || price == null || quantity == null || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      image,
    });

    res.status(201).json(sweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add sweet", error });
  }
});


/* ---------------- GET ALL SWEETS ---------------- */
router.get("/", async (_req, res) => {
  const sweets = await Sweet.find();
  res.status(200).json(sweets);
});

/* ---------------- SEARCH SWEETS ---------------- */
router.get("/search", async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const query: any = {};

  if (name) query.name = { $regex: name, $options: "i" };
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sweets = await Sweet.find(query);
  res.status(200).json(sweets);
});

/* ---------------- UPDATE SWEET (ADMIN) ---------------- */
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


/* ---------------- DELETE SWEET (ADMIN) ---------------- */
router.delete("/:id",protect, adminOnly, async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Sweet deleted successfully" });
});

/* ------------------PURCHASE SWEET------------------------ */
router.post("/:id/purchase", protect, async (req, res) => {
  const { quantity = 1 } = req.body;

  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Out of stock" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({ message: "Purchase successful", sweet });
  } catch {
    res.status(500).json({ message: "Purchase failed" });
  }
});

/* ----------------------RESTOCK SWEETS--------------------- */
router.post("/:id/restock", protect, adminOnly, async (req, res) => {
  const { quantity } = req.body;

  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += quantity;
    await sweet.save();

    res.json({ message: "Restocked successfully", sweet });
  } catch {
    res.status(500).json({ message: "Restock failed" });
  }
});



export default router;
