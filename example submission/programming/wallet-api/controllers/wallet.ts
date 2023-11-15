import { Request, Response } from 'express';
import Wallet from '../models/wallet';
import Collect from '../models/collect';
import Transaction from '../models/transaction';
import { TransactionType } from "../utils/types";

export const getAllWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await Wallet.findAll();
    res.status(200).json(wallets);
  } catch (error) {
    console.error('Error fetching wallets:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getWalletById = async (req: Request, res: Response): Promise<void> => {
  const { walletId } = req.params;

  try {
    const wallet = await Wallet.findByPk(walletId);
    
    if (!wallet) {
      res.status(404).send('Wallet not found');
      return;
    }

    res.status(200).json(wallet);
  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const transferSameCurrency = async (req: Request, res: Response) => {
  const { senderWalletId, receiverWalletId, coinId, quantity } = req.body;
  
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

    // if coin doesn't exist in receiver wallet, create it
    if (!receiverCoin) {
      receiverCoin = await Collect.create({
        walletId: receiverWalletId,
        coinId,
        quantity: 0,
      });
    }

    // update receiver wallet's coin quantity
    await receiverCoin.increment("quantity", { by: quantity });

    await Transaction.create({
      senderId: senderWalletId,
      recipientId: receiverWalletId,
      coinId,
      amount: quantity,
      type: TransactionType.SAME_CURRENCY_TRANSFER,
    });

    return res.status(200).json({ message: "Coins transferred successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
