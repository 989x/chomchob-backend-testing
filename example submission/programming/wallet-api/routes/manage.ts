import express from "express";
import { getAllWallets, getWalletById } from "../controllers/wallet";
import { getAllCoins, getCoinById } from "../controllers/coin";
import { userAccess } from "../middlewares/checkAccess";
import { verifyToken } from "../middlewares/accessToken";

const router = express.Router();

// wallet
router.get("/wallet", verifyToken, userAccess, getAllWallets);
router.get("/wallet/:walletId", verifyToken, userAccess, getWalletById);
// coin
router.get("/coin", verifyToken, userAccess, getAllCoins);
router.get("/coin/:coinId", verifyToken, userAccess, getCoinById);

export default router;
