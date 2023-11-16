import Transaction from "../models/transaction";
import { TransactionType } from "./types";

export const createTransaction = async (
  senderWalletId: number | any,
  receiverWalletId: number,
  coinId: number,
  quantity: number,
  type: TransactionType = TransactionType.SAME_CURRENCY_TRANSFER
) => {
  try {
    await Transaction.create({
      senderId: senderWalletId,
      recipientId: receiverWalletId,
      coinId,
      amount: quantity,
      type,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error; 
  }
};
