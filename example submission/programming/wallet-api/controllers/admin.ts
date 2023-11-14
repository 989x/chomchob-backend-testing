import { Request, Response } from "express";
import User from "../models/user";
import Wallet from "../models/wallet";
import Coin from "../models/coin";

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

// ________________________________________ coin

export const getTotalBalance = async (req: Request, res: Response) => {
  try {
    // retrieve all wallets with associated coins
    const wallets = await Wallet.findAll({
      include: [{ model: Coin, attributes: ["exchangeRate"] }],
    });

    // calculate total balance considering exchange rates
    const totalBalance = wallets.reduce((acc, wallet) => {
      // check wallet has associated coin
      if (wallet.coin) {
        return acc + wallet.balance * wallet.coin.exchangeRate;
      } else {
        console.warn(`Wallet with ID ${wallet.walletId} has no associated coin.`);
        return acc;
      }
    }, 0);

    return res.status(200).json({ totalBalance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addCryptoCurrency = async (req: Request, res: Response) => {
  try {
    const { symbol, name, exchangeRate } = req.body;

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
