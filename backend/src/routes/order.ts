import express from "express";
import Sweet from "../models/Sweet";
import { protect } from "../middleware/auth";
import mongoose from "mongoose";

const router = express.Router();

/* ------------- BUY SWEETS ------------- */
router.post("/buy", protect, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items } = req.body; // [{ sweetId, quantity }]

    if (!items || !Array.isArray(items)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid request" });
    }

    // Check all sweets first to prevent partial updates
    for (const item of items) {
      const sweet = await Sweet.findById(item.sweetId).session(session);
      if (!sweet) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: `Sweet ${item.sweetId} not found` });
      }
      if (sweet.quantity < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: `Not enough quantity for ${sweet.name}` });
      }
    }

    // All sweets are available, now decrement
    for (const item of items) {
      await Sweet.findByIdAndUpdate(
        item.sweetId,
        { $inc: { quantity: -item.quantity } },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Purchase successful" });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Purchase failed" });
  }
});

export default router;
