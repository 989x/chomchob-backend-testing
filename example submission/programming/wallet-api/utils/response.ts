import { Response } from "express";

// ________________________________________ interface

interface UpdatedBalanceResponse {
  userId: number;
  coinId: number;
  quantity: number;
}

// ________________________________________ function

export const sendIncreaseBalanceResponse = (
  res: Response,
  message: string,
  updatedBalance: UpdatedBalanceResponse
) => {
  return res.status(200).json({
    message,
    updatedBalance,
  });
};

export const sendDecreaseBalanceResponse = (
  res: Response,
  message: string,
  updatedBalance: UpdatedBalanceResponse,
) => {
  return res.status(200).json({
    message,
    updatedBalance,
  });
};

export const sendCoinsTransferResponse = (
  res: Response,
  message: string,
  senderWalletId: number,
  receiverWalletId: number,
  senderCoinId: number,
  receiverCoinId: number,
  updatedSenderQuantity?: number,
  updatedReceiverQuantity?: number
) => {
  const response = {
    sender: {
      walletId: senderWalletId,
      coinId: senderCoinId,
      quantity: updatedSenderQuantity || 0,
    },
    receiver: {
      walletId: receiverWalletId,
      coinId: receiverCoinId,
      quantity: updatedReceiverQuantity || 0,
    },
  };

  return res.status(200).json({
    message,
    updatedCoins: response,
  });
};
