import bcrypt from 'bcrypt';
import User from "../models/user";
import Wallet from "../models/wallet";
import Coin from "../models/coin";
import { UserRole, UserStatus } from "./types";

export async function seedUsers() {
  try {
    const existingUsers = await User.findAll();
    if (existingUsers.length === 0) {
      const usersData = [
        {
          role: UserRole.ADMIN,
          status: UserStatus.ACTIVE,
          verified: true,
          email: "admin@example.com",
          username: "admin",
          password: await bcrypt.hash('admin123', 10),
        },
        {
          role: UserRole.GENERAL,
          status: UserStatus.ACTIVE,
          verified: true,
          email: "user1@example.com",
          username: "user1",
          password: await bcrypt.hash('password1', 10),
        },
        {
          role: UserRole.GENERAL,
          status: UserStatus.ACTIVE,
          verified: false,
          email: "user2@example.com",
          username: "user2",
          password: await bcrypt.hash('password2', 10),
        },
      ];

      const createdUsers = await User.bulkCreate(usersData);
      console.log("Users seeded successfully:", createdUsers);

      // mock wallet data for each user registration
      for (const user of createdUsers) {
        await seedWalletForUser(user.userId);
      }
    } else {
      console.log("Users already exist. Skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

export async function seedWalletForUser(userId: number) {
  try {
    const existingWallet = await Wallet.findOne({ where: { userId } });
    if (!existingWallet) {
      const walletData = {
        currency: 'USD',
        balance: 0,
        userId: userId,
      };

      const createdWallet = await Wallet.create(walletData);
      console.log(`Wallet seeded successfully for user ${userId}:`, createdWallet);
    } else {
      console.log(`Wallet already exists for user ${userId}. Skipping seed.`);
    }
  } catch (error) {
    console.error(`Error seeding wallet for user ${userId}:`, error);
  }
}

export async function seedCoins() {
  try {
    const existingCoins = await Coin.findAll();
    if (existingCoins.length === 0) {
      const coinsData = [
        {
          symbol: "BTC",
          name: "Bitcoin",
          exchangeRate: 50000,
        },
        {
          symbol: "ETH",
          name: "Ethereum",
          exchangeRate: 3000,
        },
        {
          symbol: "LTC",
          name: "Litecoin",
          exchangeRate: 150,
        },
      ];

      const createdCoins = await Coin.bulkCreate(coinsData);
      console.log("Coins seeded successfully:", createdCoins);
    } else {
      console.log("Coins already exist. Skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding coins:", error);
  }
}

export const allSeedFunctions = [seedUsers, seedCoins];
