import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not defined");

  const payload = { id: userId };

  // explicit type assertion
  return jwt.sign(payload as Record<string, unknown>, secret, { expiresIn: "1d" });
};
