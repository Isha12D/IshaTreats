import { Request, Response, NextFunction } from "express";

export const adminOnly = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Admin access only" });
};
