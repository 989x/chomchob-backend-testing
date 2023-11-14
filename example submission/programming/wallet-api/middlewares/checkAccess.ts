import { Response, NextFunction } from "express";
import { AuthRequest } from "./accessToken";
import { UserRole } from "../utils/types";

const checkAccess = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRoles = req.userToken?.role ? [req.userToken?.role] : [];

    const hasAccess = userRoles.some(role => allowedRoles.includes(role));

    if (hasAccess) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
  };
};

const adminAccess = checkAccess([UserRole.ADMIN]);
const userAccess = checkAccess([UserRole.ADMIN, UserRole.GENERAL, UserRole.TRIAL]);

export { adminAccess, userAccess };
