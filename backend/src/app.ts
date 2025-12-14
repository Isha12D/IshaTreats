import express from "express";
import cors from 'cors';
import authRoutes from "./routes/auth.routes";
import sweetRoutes from "./routes/sweetRoutes";
import orderRoutes from "./routes/order"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Isha Treats API running 🍬");
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/orders", orderRoutes);

export default app;

