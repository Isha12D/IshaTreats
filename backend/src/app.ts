import express from "express";
import cors from 'cors';
import authRoutes from "./routes/auth.routes";
import sweetRoutes from "./routes/sweetRoutes";
import orderRoutes from "./routes/order"

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
  origin: [FRONTEND_URL],
  credentials: true
}));

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Isha Treats API running 🍬");
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/orders", orderRoutes);

export default app;

