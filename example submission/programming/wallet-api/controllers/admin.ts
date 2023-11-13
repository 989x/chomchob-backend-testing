import { Request, Response } from "express";
import User from "../models/user";

export const promoteToAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;

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
