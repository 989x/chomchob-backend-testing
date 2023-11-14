import express from "express";
import { promoteToAdmin, updateBalance } from "../controllers/admin";
import { verifyToken } from "../middlewares/accessToken";
import { adminAccess } from "../middlewares/checkAccess";

const router = express.Router();

// user
router.put("/promote-to-admin", verifyToken, adminAccess, promoteToAdmin);
// wallet
router.put("/update-balance", verifyToken, adminAccess, updateBalance);

export default router;
