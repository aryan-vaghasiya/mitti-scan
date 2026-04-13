import jwt from "jsonwebtoken"
import type { NextFunction, Request, Response } from "express";

const requiredAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(402).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  }
  catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

export default requiredAuth;