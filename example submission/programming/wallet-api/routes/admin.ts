import express from "express";
import {
  promoteToAdmin,
  addCryptoCurrency,
  getTotalBalance,
  increaseBalance,
  decreaseBalance,
  updateExchangeRate,
} from "../controllers/admin";
import { verifyToken } from "../middlewares/accessToken";
import { adminAccess } from "../middlewares/checkAccess";

const router = express.Router();

// user
router.put("/promote-to-admin", verifyToken, promoteToAdmin);
// wallet
router.get("/total-balance", verifyToken, adminAccess, getTotalBalance);
router.post("/increase-balance", verifyToken, adminAccess, increaseBalance);
router.post("/decrease-balance", verifyToken, adminAccess, decreaseBalance);
// coin
router.post("/add-cryptocurrency", verifyToken, adminAccess, addCryptoCurrency);
router.put("/update-exchange-rate", verifyToken, adminAccess, updateExchangeRate);

export default router;
