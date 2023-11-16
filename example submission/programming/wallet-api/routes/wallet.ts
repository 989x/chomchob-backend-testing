import express from "express";
import {
  getAllWallets,
  getWalletById,
  transferDifferentCurrency,
  transferSameCurrency,
} from "../controllers/wallet";
import { userAccess } from "../middlewares/checkAccess";
import { verifyToken } from "../middlewares/accessToken";

const router = express.Router();

// get
router.get("/wallet", verifyToken, userAccess, getAllWallets);
router.get("/wallet/:walletId", verifyToken, userAccess, getWalletById);
// transfer
router.post("/wallet/transfer-same-currency", verifyToken, userAccess, transferSameCurrency);
router.post("/wallet/transfer-different-currency", verifyToken, userAccess, transferDifferentCurrency);

export default router;
