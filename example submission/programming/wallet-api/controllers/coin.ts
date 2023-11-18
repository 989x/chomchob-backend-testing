import { Request, Response } from 'express';
import Coin from '../models/coin';

export const getAllCoins = async (req: Request, res: Response) => {
  try {
    const coins = await Coin.findAll();
    res.status(200).json(coins);
  } catch (error) {
    console.error('Error fetching coins:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getCoinById = async (req: Request, res: Response): Promise<void> => {
  const { coinId } = req.params;

  try {
    const coin = await Coin.findByPk(coinId);

    if (!coin) {
      res.status(404).send('Coin not found');
      return;
    }

    res.status(200).json(coin);
  } catch (error) {
    console.error('Error fetching coin:', error);
    res.status(500).send('Internal Server Error');
  }
};
