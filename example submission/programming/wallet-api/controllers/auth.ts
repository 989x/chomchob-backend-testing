import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Wallet from "../models/wallet";
import { JWT_SECRET } from "../configs/secrets";

function generateToken(user: any) {
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const expiresIn = "23h";

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

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
    const newWallet = await Wallet.create({ userId: newUser.id });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
      wallet: {
        id: newWallet.id,
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

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
