import { Request, Response } from "express";
import User from "../models/user";
import Wallet from "../models/wallet";

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

export const updateBalance = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    const wallet = await Wallet.findOne({ where: { userId } });

    if (!wallet) {
      return res.status(404).json({ error: "User wallet not found." });
    }

    // update balance to wallet
    await wallet.updateBalance(amount);

    res.status(200).json({ message: "Balance updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};
