import { Request, Response } from "express";
import Transaction from "../models/transaction";

export const getAllTransactions = async (req: Request, res: Response) => {
  const { type } = req.query;

  try {
    let whereCondition = {};
    if (type) {
      whereCondition = { type };
    }

    const transactions = await Transaction.findAll({ where: whereCondition });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findByPk(Number(transactionId));

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.error('Error fetching transaction by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
