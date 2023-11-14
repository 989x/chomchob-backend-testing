import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import Wallet from "../models/wallet";
import { generateToken } from "../middlewares/accessToken";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // create new wallet
    const newWallet = await Wallet.create({ userId: newUser.userId });

    res.status(201).json({
      message: "Registration successful",
      user: {
        userId: newUser.userId,
        email: newUser.email,
        username: newUser.username,
      },
      wallet: {
        walletId: newWallet.walletId,
        userId: newWallet.userId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // create accessToken
    const token = generateToken(user);

    res.status(200).json({ token, userId: user.userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
