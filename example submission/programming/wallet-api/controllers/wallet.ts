import { Request, Response } from 'express';
import Wallet from '../models/wallet';

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
