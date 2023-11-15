import express from "express";
import { getAllWallets, getWalletById } from "../controllers/wallet";
import { getAllCoins, getCoinById } from "../controllers/coin";
import { userAccess } from "../middlewares/checkAccess";
import { verifyToken } from "../middlewares/accessToken";
import {
  getAllTransactions,
  getTransactionById,
} from "../controllers/transaction";

const router = express.Router();

// wallet
router.get("/wallet", verifyToken, userAccess, getAllWallets);
router.get("/wallet/:walletId", verifyToken, userAccess, getWalletById);
// coin
router.get("/coin", verifyToken, userAccess, getAllCoins);
router.get("/coin/:coinId", verifyToken, userAccess, getCoinById);

// transaction
// transaction?type=increase, transaction?type=decrease
router.get("/transaction", verifyToken, userAccess, getAllTransactions);
router.get("/transaction/:transactionId", verifyToken, userAccess, getTransactionById);

export default router;
