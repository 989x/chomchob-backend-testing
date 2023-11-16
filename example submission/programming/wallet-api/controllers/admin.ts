import { Request, Response } from "express";
import User from "../models/user";
import Coin from "../models/coin";
import Collect from "../models/collect";
import Transaction from "../models/transaction"; 
import { AuthRequest } from "../middlewares/accessToken";
import { TransactionType } from "../utils/types";

// ________________________________________ user

export const promoteToAdmin = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update user role to admin
    await user.update({ role: "admin" });

    res.status(200).json({ message: "User promoted to admin successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to promote user to admin" });
  }
};

// ________________________________________ wallet

export const getTotalBalance = async (req: Request, res: Response) => {
  try {
    // find all collections with associated coins
    const collections = await Collect.findAll({
      include: Coin,
    });

    // calculate the total balance for each coin
    const totalBalances = collections.reduce((acc, collection) => {
      const coinSymbol = collection.Coin?.getDataValue("symbol");
      const quantity = collection.getDataValue("quantity");

      if (coinSymbol && quantity !== undefined) {
        if (!acc[coinSymbol]) {
          acc[coinSymbol] = 0;
        }
        acc[coinSymbol] += quantity;
      }

      return acc;
    }, {} as Record<string, number>);

    return res.status(200).json({ totalBalances });
  } catch (error) {
    console.error("Error getting total balance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const increaseBalance = async (req: AuthRequest, res: Response) => {
  const senderId = req.userToken?.userId
  const { userEmail, amount, coinSymbol } = req.body;

  try {
    if (!userEmail || !amount || !coinSymbol) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    // find user with email
    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // find coin with symbol
    const coin = await Coin.findOne({ where: { symbol: coinSymbol } });

    if (!coin) {
      return res.status(404).json({ error: "Coin not found" });
    }

    // check if collection for user and coin already exists
    const existingCollection = await Collect.findOne({
      where: { walletId: user.userId, coinId: coin.coinId },
    });

    if (existingCollection) {
      // update quantity if collection already exists
      existingCollection.quantity += amount;
      await existingCollection.save();
    } else {
      // create new collection if it doesn't exist
      await Collect.create({
        walletId: user.userId,
        quantity: amount,
        coinId: coin.coinId,
      });
    }

    // create new transaction record
    await Transaction.create({
      senderId: senderId,
      recipientId: user.userId,
      coinId: coin.coinId,
      amount: amount,
      type: TransactionType.INCREASE,
    });

    return res.status(200).json({ message: "Balance increased successfully" });
  } catch (error) {
    console.error("Error increasing balance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const decreaseBalance = async (req: AuthRequest, res: Response) => {
  const senderId = req.userToken?.userId
  const { userEmail, amount, coinSymbol } = req.body;

  try {
    if (!userEmail || !amount || !coinSymbol) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    // find user with email
    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // find coin with symbol
    const coin = await Coin.findOne({ where: { symbol: coinSymbol } });

    if (!coin) {
      return res.status(404).json({ error: "Coin not found" });
    }

    // check if collection for user and coin already exists
    const existingCollection = await Collect.findOne({
      where: { walletId: user.userId, coinId: coin.coinId },
    });

    if (existingCollection) {
      // update quantity by subtracting specified amount
      existingCollection.quantity -= amount;

      // check if resulting quantity is non-negative
      if (existingCollection.quantity < 0) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      await existingCollection.save();

      // create new transaction record
      await Transaction.create({
        senderId: senderId,
        recipientId: user.userId,
        coinId: coin.coinId,
        amount: amount,
        type: TransactionType.DECREASE,
      });
    } else {
      return res.status(400).json({ error: "No existing collection found" });
    }

    return res.status(200).json({ message: "Balance decreased successfully" });
  } catch (error) {
    console.error("Error decreasing balance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ________________________________________ coin

export const addCryptoCurrency = async (req: Request, res: Response) => {
  const { symbol, name, exchangeRate } = req.body;
  
  try {
    // check cryptocurrency with symbol already exists
    const existingCoin = await Coin.findOne({ where: { symbol } });
    if (existingCoin) {
      return res.status(400).json({ error: "Crypto currency with this symbol already exists." });
    }

    // create new cryptocurrency
    const newCoin = await Coin.create({
      symbol,
      name,
      exchangeRate,
    });

    return res.status(201).json(newCoin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateExchangeRate = async (req: Request, res: Response) => {
  const { symbol, exchangeRate } = req.body;

  try {
    // check cryptocurrency with symbol already exists
    const coin = await Coin.findOne({ where: { symbol } });
    if (!coin) {
      return res.status(404).json({ error: "Crypto currency not found." });
    }

    // update exchange rate
    await coin.update({ exchangeRate });

    return res.status(200).json(coin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
