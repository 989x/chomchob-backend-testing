import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../utils/types";
import { JWT_SECRET } from "../configs/secrets";

export function generateToken(user: any) {
  const payload = {
    userId: user.userId,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const expiresIn = "23h";

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export interface AuthRequest extends Request {
  userToken?: {
    userId?: number;
    username?: string;
    email?: string;
    role?: UserRole;
  };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  token = token.split(" ")[1];

  try {
    const decoded: jwt.JwtPayload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    req.userToken = {
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};
