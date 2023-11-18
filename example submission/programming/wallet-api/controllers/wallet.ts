import { Request, Response } from "express";
import Wallet from "../models/wallet";
import Coin from "../models/coin";
import Collect from "../models/collect";
import { AuthRequest } from "../middlewares/accessToken";
import { TransactionType } from "../utils/types";
import { createTransaction } from "../utils/transaction";
import { sendCoinsTransferResponse } from "../utils/response";

export const getAllWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await Wallet.findAll();
    res.status(200).json(wallets);
  } catch (error) {
    console.error("Error fetching wallets:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getWalletById = async (req: Request, res: Response) => {
  const { walletId } = req.params;

  try {
    const wallet = await Wallet.findByPk(walletId);

    if (!wallet) {
      res.status(404).send("Wallet not found");
      return;
    }

    res.status(200).json(wallet);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const transferSameCurrency = async (req: AuthRequest, res: Response) => {
  const senderWalletId = req.userToken?.walletId;
  const { receiverWalletId, coinId, quantity } = req.body;

  if (senderWalletId === undefined) {
    return res.status(401).json({ error: "Sender wallet not specified." });
  }

  try {
    // check sender and receiver wallets exist
    const senderWallet = await Wallet.findByPk(senderWalletId);
    const receiverWallet = await Wallet.findByPk(receiverWalletId);

    if (!senderWallet || !receiverWallet) {
      return res.status(404).json({ error: "Sender or receiver wallet not found." });
    }

    // check coin exists in sender wallet
    const senderCoin = await Collect.findOne({
      where: { walletId: senderWalletId, coinId },
    });

    if (!senderCoin || senderCoin.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient funds for the specified coin in the sender wallet." });
    }

    // update sender wallet's coin quantity
    await senderCoin.decrement("quantity", { by: quantity });

    // check coin exists in the receiver wallet
    let receiverCoin = await Collect.findOne({
      where: { walletId: receiverWalletId, coinId },
    });

    // create it, if coin doesn't exist in receiver wallet
    if (!receiverCoin) {
      receiverCoin = await Collect.create({
        walletId: receiverWalletId,
        coinId: coinId,
        quantity: quantity,
      });
    }

    // update receiver wallet's coin quantity
    await receiverCoin.increment("quantity", { by: quantity });

    // fetch updated quantities
    const updatedSenderCoin = await Collect.findOne({
      where: { walletId: senderWalletId, coinId },
    });

    const updatedReceiverCoin = await Collect.findOne({
      where: { walletId: receiverWalletId, coinId },
    });

    // create new transaction record
    await createTransaction(
      senderWalletId,
      receiverWalletId,
      coinId,
      quantity,
      TransactionType.SAME_CURRENCY_TRANSFER
    );

    sendCoinsTransferResponse(
      res,
      "Coins transferred successfully.",
      senderWalletId,
      receiverWalletId,
      coinId,
      coinId, 
      updatedSenderCoin?.quantity,
      updatedReceiverCoin?.quantity
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const transferDifferentCurrency = async (req: AuthRequest, res: Response) => {
  const senderWalletId = req.userToken?.walletId;
  const { receiverWalletId, senderCoinId, receiverCoinId, quantity } = req.body;

  if (senderWalletId === undefined) {
    return res.status(401).json({ error: "Sender wallet not specified." });
  }

  try {
    // check sender and receiver wallets exist
    const senderWallet = await Wallet.findByPk(senderWalletId);
    const receiverWallet = await Wallet.findByPk(receiverWalletId);

    if (!senderWallet || !receiverWallet) {
      return res.status(404).json({ error: "Sender or receiver wallet not found." });
    }

    // check coins exist in sender and receiver wallets
    const senderCoin = await Collect.findOne({
      where: { walletId: senderWalletId, coinId: senderCoinId },
    });

    const receiverCoin = await Collect.findOne({
      where: { walletId: receiverWalletId, coinId: receiverCoinId },
    });

    if (!senderCoin || !receiverCoin) {
      return res.status(400).json({ error: "Invalid sender or receiver coin specified." });
    }

    // check if there's enough quantity in sender wallet
    if (senderCoin.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient funds for the specified coin in the sender wallet." });
    }

    // get exchange rate between senderCoin and receiverCoin
    const senderCoinDetails = await Coin.findByPk(senderCoinId);
    const receiverCoinDetails = await Coin.findByPk(receiverCoinId);

    if (!senderCoinDetails || !receiverCoinDetails) {
      return res.status(400).json({ error: "Invalid sender or receiver coin specified." });
    }

    const exchangeRate = receiverCoinDetails.exchangeRate / senderCoinDetails.exchangeRate;

    // update sender wallet's coin quantity
    await senderCoin.decrement("quantity", { by: quantity });

    // update receiver wallet's coin quantity
    await receiverCoin.increment("quantity", { by: quantity / exchangeRate });

    // fetch updated quantities
    const updatedSenderCoin = await Collect.findOne({
      where: { walletId: senderWalletId, coinId: senderCoinId },
    });

    const updatedReceiverCoin = await Collect.findOne({
      where: { walletId: receiverWalletId, coinId: receiverCoinId },
    });

    // create new transaction record
    await createTransaction(
      senderWalletId,
      receiverWalletId,
      senderCoinId,
      quantity,
      TransactionType.DIFFERENT_CURRENCY_TRANSFER
    );

    sendCoinsTransferResponse(
      res,
      "Coins transferred successfully.",
      senderWalletId,
      receiverWalletId,
      senderCoinId,
      receiverCoinId,
      updatedSenderCoin?.quantity,
      updatedReceiverCoin?.quantity
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
