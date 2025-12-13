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
router.get("/", protect, async (_req, res) => {
  const sweets = await Sweet.find();
  res.status(200).json(sweets);
});

/* ---------------- SEARCH SWEETS ---------------- */
router.get("/search", protect, async (req, res) => {
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
  const sweet = await Sweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(sweet);
});

/* ---------------- DELETE SWEET (ADMIN) ---------------- */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Sweet deleted successfully" });
});

export default router;
