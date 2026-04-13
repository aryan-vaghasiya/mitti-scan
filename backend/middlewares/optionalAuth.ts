import type { NextFunction } from "express";
import jwt from "jsonwebtoken";

const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    req.user = null
    return next()
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

export { optionalAuth }