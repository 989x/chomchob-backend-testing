import express from "express";
import { getAllCoins, getCoinById } from "../controllers/coin";
import {
  getAllTransactions,
  getTransactionById,
} from "../controllers/transaction";
import { getAllCollects, getCollectById } from "../controllers/collect";
import { userAccess } from "../middlewares/checkAccess";
import { verifyToken } from "../middlewares/accessToken";

const router = express.Router();

// coin
router.get("/coin", verifyToken, userAccess, getAllCoins);
router.get("/coin/:coinId", verifyToken, userAccess, getCoinById);
// collect
router.get("/collect", verifyToken, userAccess, getAllCollects);
router.get("/collects/:collectId", verifyToken, userAccess, getCollectById);
// transaction
// Example: GET transaction?type=increase, transaction?type=decrease
router.get("/transaction", verifyToken, userAccess, getAllTransactions);
router.get("/transaction/:transactionId", verifyToken, userAccess, getTransactionById);

export default router;
