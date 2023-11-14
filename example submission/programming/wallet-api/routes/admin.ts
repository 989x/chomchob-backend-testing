import express from "express";
import {
  promoteToAdmin,
  addCryptoCurrency,
  updateExchangeRate,
  getTotalBalance,
} from "../controllers/admin";
import { verifyToken } from "../middlewares/accessToken";
import { adminAccess } from "../middlewares/checkAccess";

const router = express.Router();

// user
router.put("/promote-to-admin", verifyToken, adminAccess, promoteToAdmin);
// coin
router.get("/total-balance", verifyToken, adminAccess, getTotalBalance);
router.post("/add-cryptocurrency", verifyToken, adminAccess, addCryptoCurrency);
router.put("/update-exchange-rate", verifyToken, adminAccess, updateExchangeRate);

export default router;
